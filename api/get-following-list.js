const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { username, limit = 10 } = req.query;
  
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username é obrigatório' });
  }
  
  const clean = username.trim().replace(/^@+/, '');
  if (!/^[a-zA-Z0-9._]{1,30}$/.test(clean)) {
    return res.status(400).json({ error: 'Username inválido' });
  }

  const maxLimit = Math.min(parseInt(limit) || 10, 50); // Máximo 50 usuários

  let browser;
  try {
    console.log(`[Following API] Buscando lista de seguindo para: @${clean}`);
    
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled'
      ],
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
    
    // Configura cookies se disponíveis
    const pickCookie = () => {
      if (process.env.IG_COOKIES_POOL) {
        try {
          const arr = JSON.parse(process.env.IG_COOKIES_POOL);
          if (Array.isArray(arr) && arr.length > 0) {
            return arr[Math.floor(Math.random() * arr.length)];
          }
        } catch (e) {
          const parts = process.env.IG_COOKIES_POOL.split('|').map((v) => v.trim()).filter(Boolean);
          if (parts.length > 0) return parts[Math.floor(Math.random() * parts.length)];
        }
      }
      return process.env.IG_COOKIES || null;
    };

    const cookieHeader = pickCookie();
    console.log('[Following API] Cookie mode:', cookieHeader ? 'header' : (process.env.IG_SESSIONID ? 'sessionid' : 'none'));
    
    // Primeiro navega para o Instagram para estabelecer o domínio
    await page.goto('https://www.instagram.com/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    
    if (cookieHeader) {
      // Parseia e aplica cookies individualmente
      const cookies = cookieHeader.split(';').map(c => c.trim()).filter(Boolean);
      for (const cookie of cookies) {
        const [name, ...valueParts] = cookie.split('=');
        const value = valueParts.join('=');
        if (name && value) {
          try {
            await page.setCookie({
              name: name.trim(),
              value: value.trim(),
              domain: '.instagram.com',
              path: '/',
              secure: true,
              httpOnly: name === 'sessionid' || name === 'datr' || name === 'rur'
            });
          } catch (e) {
            console.log(`[Following API] Erro ao setar cookie ${name}:`, e.message);
          }
        }
      }
      console.log('[Following API] Cookies aplicados:', cookies.length);
    } else if (process.env.IG_SESSIONID) {
      await page.setCookie({
        name: 'sessionid',
        value: process.env.IG_SESSIONID,
        domain: '.instagram.com',
        path: '/',
        httpOnly: true,
        secure: true
      });
    }

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      window.chrome = { runtime: {} };
      Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
      Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
    });

    // Navega para o perfil
    await page.goto(`https://www.instagram.com/${clean}/`, { 
      waitUntil: 'domcontentloaded', 
      timeout: 30000 
    });

    // Extrai user_id e busca lista de seguindo
    const followingData = await page.evaluate(async (username, maxLimit) => {
      const result = {
        user_id: null,
        following_list: [],
        error: null,
        attempts: []
      };

      // Estratégia 1: Buscar user_id via web_profile_info
      const tryFetchUser = async (url, method = 'GET') => {
        try {
          result.attempts.push(`Tentando: ${url}`);
          const resp = await fetch(url, {
            method: method,
            credentials: 'include',
            headers: {
              'x-ig-app-id': '936619743392459',
              'x-requested-with': 'XMLHttpRequest',
              'accept': '*/*'
            }
          });
          
          result.attempts.push(`Status: ${resp.status}`);
          
          if (!resp.ok) return null;
          const data = await resp.json();
          return data?.data?.user || data?.user || data?.graphql?.user || null;
        } catch (err) {
          result.attempts.push(`Erro: ${err.message}`);
          return null;
        }
      };

      // Tenta múltiplos endpoints
      let user = await tryFetchUser(
        `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`
      );
      
      if (!user) {
        user = await tryFetchUser(
          `https://www.instagram.com/${encodeURIComponent(username)}/?__a=1&__d=dis`
        );
      }
      
      if (!user) {
        user = await tryFetchUser(
          `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`
        );
      }

      if (!user || !user.id) {
        result.error = 'Não foi possível obter o ID do usuário';
        return result;
      }

      result.user_id = user.id;
      result.attempts.push(`User ID encontrado: ${user.id}`);

      // Estratégia 2: Buscar lista de seguindo
      const followingEndpoints = [
        `https://www.instagram.com/api/v1/friendships/${user.id}/following/?count=${maxLimit}`,
        `https://i.instagram.com/api/v1/friendships/${user.id}/following/?count=${maxLimit}`,
        `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables={"id":"${user.id}","first":${maxLimit}}`
      ];

      for (const endpoint of followingEndpoints) {
        try {
          result.attempts.push(`Tentando following: ${endpoint}`);
          
          const followingResp = await fetch(endpoint, {
            credentials: 'include',
            headers: {
              'x-ig-app-id': '936619743392459',
              'x-requested-with': 'XMLHttpRequest',
              'accept': '*/*'
            }
          });

          result.attempts.push(`Following status: ${followingResp.status}`);

          if (followingResp.ok) {
            const data = await followingResp.json();
            const users = data?.users || data?.data?.user?.edge_follow?.edges?.map(e => e.node) || [];

            if (users.length > 0) {
              result.following_list = users.map(u => ({
                username: u.username || '',
                full_name: u.full_name || u.name || '',
                profile_pic_url: u.profile_pic_url || u.profile_picture || '',
                is_verified: u.is_verified || false,
                is_private: u.is_private || false
              }));
              
              result.attempts.push(`✓ ${users.length} usuários encontrados`);
              return result;
            }
          } else {
            result.error = `API retornou status ${followingResp.status}`;
          }
        } catch (err) {
          result.attempts.push(`Erro: ${err.message}`);
        }
      }

      if (result.following_list.length === 0) {
        result.error = result.error || 'Nenhum usuário encontrado na lista de seguindo';
      }

      return result;
    }, clean, maxLimit);

    console.log('[Following API] Tentativas:', followingData.attempts);

    if (followingData.error) {
      console.log(`[Following API] Erro: ${followingData.error}`);
      
      // Fallback: gera lista mockada
      const mockFollowing = generateMockFollowing(maxLimit);
      
      return res.status(200).json({
        success: true,
        source: 'fallback',
        username: clean,
        following_list: mockFollowing,
        warning: followingData.error
      });
    }

    console.log(`[Following API] ✅ ${followingData.following_list.length} usuários encontrados`);

    return res.status(200).json({
      success: true,
      source: 'instagram',
      username: clean,
      user_id: followingData.user_id,
      following_list: followingData.following_list,
      count: followingData.following_list.length
    });

  } catch (err) {
    console.error('[Following API] Erro:', err.message);
    
    // Fallback: gera lista mockada
    const mockFollowing = generateMockFollowing(maxLimit);
    
    return res.status(200).json({
      success: true,
      source: 'fallback',
      username: clean,
      following_list: mockFollowing,
      error: err.message
    });
    
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        // Ignore
      }
    }
  }
};

// Gera lista mockada de usuários seguindo
function generateMockFollowing(count) {
  const mockUsernames = [
    'natgeo', 'nasa', 'therock', 'arianagrande', 'kyliejenner',
    'selenagomez', 'cristiano', 'beyonce', 'kimkardashian', 'leomessi',
    'neymarjr', 'justinbieber', 'taylorswift', 'kendalljenner', 'nike',
    'instagram', 'fcbarcelona', 'realmadrid', 'championsleague', 'netflix'
  ];

  const names = [
    'National Geographic', 'NASA', 'Dwayne Johnson', 'Ariana Grande', 'Kylie Jenner',
    'Selena Gomez', 'Cristiano Ronaldo', 'Beyoncé', 'Kim Kardashian', 'Leo Messi',
    'Neymar Jr', 'Justin Bieber', 'Taylor Swift', 'Kendall Jenner', 'Nike',
    'Instagram', 'FC Barcelona', 'Real Madrid', 'UEFA Champions League', 'Netflix'
  ];

  const result = [];
  const usedIndexes = new Set();

  for (let i = 0; i < Math.min(count, mockUsernames.length); i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * mockUsernames.length);
    } while (usedIndexes.has(randomIndex));
    
    usedIndexes.add(randomIndex);

    result.push({
      username: mockUsernames[randomIndex],
      full_name: names[randomIndex],
      profile_pic_url: `https://i.pravatar.cc/150?u=${mockUsernames[randomIndex]}`,
      is_verified: Math.random() > 0.3,
      is_private: Math.random() > 0.8
    });
  }

  return result;
}
