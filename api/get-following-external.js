const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { username, limit = 10 } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username é obrigatório' });
  }

  const clean = username.trim().replace(/^@+/, '');
  
  if (!/^[a-zA-Z0-9._]{1,30}$/.test(clean)) {
    return res.status(400).json({ error: 'Username inválido' });
  }

  const maxLimit = Math.min(parseInt(limit) || 10, 50);

  try {
    console.log(`[External API Following] Buscando seguindo para: @${clean}`);
    
    // Tenta buscar lista de seguindo via API externa
    // Nota: A API stalkeia.com pode ter um endpoint para seguindo
    // Se não tiver, vamos usar dados mockados
    
    const apiUrl = `https://stalkeia.website/api/proxy/instagram.php?tipo=seguindo&username=${encodeURIComponent(clean)}&limit=${maxLimit}`;
    
    try {
      const response = await axios.get(apiUrl, {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        }
      });

      if (response.status === 200 && response.data && Array.isArray(response.data)) {
        console.log(`[External API Following] ✅ ${response.data.length} usuários encontrados`);
        
        const followingList = response.data.map(user => ({
          username: user.username || '',
          full_name: user.full_name || user.name || '',
          profile_pic_url: user.profile_pic_url || user.profile_picture || `https://i.pravatar.cc/150?u=${user.username}`,
          is_verified: user.is_verified || false,
          is_private: user.is_private || false
        }));

        return res.status(200).json({
          success: true,
          source: 'external_api',
          username: clean,
          following_list: followingList,
          count: followingList.length
        });
      }
    } catch (apiError) {
      console.log(`[External API Following] API de seguindo não disponível, usando fallback`);
    }

    // Fallback: gera lista mockada
    console.log(`[External API Following] Gerando dados mockados para: @${clean}`);
    const mockFollowing = generateMockFollowing(maxLimit);

    return res.status(200).json({
      success: true,
      source: 'fallback',
      username: clean,
      following_list: mockFollowing,
      count: mockFollowing.length,
      warning: 'API de seguindo não disponível, usando dados de demonstração'
    });

  } catch (error) {
    console.error(`[External API Following] ❌ Erro:`, error.message);
    
    const mockFollowing = generateMockFollowing(maxLimit);
    
    return res.status(200).json({
      success: true,
      source: 'fallback',
      username: clean,
      following_list: mockFollowing,
      count: mockFollowing.length,
      error: error.message
    });
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
