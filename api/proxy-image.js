const https = require('https');
const http = require('http');
const { URL } = require('url');

const ALLOWED_HOSTS = [
  'scontent-',
  'instagram.',
  'cdninstagram.com',
  'fbcdn.net',
  'i.pravatar.cc',
  'proxt-insta.projetinho-solo.workers.dev',
  'projetinho-solo.workers.dev',
  'supabase.co'
];

function isAllowedUrl(urlStr) {
  try {
    const parsed = new URL(urlStr);
    return ALLOWED_HOSTS.some(host => parsed.hostname.includes(host));
  } catch {
    return false;
  }
}

function extractOriginalUrl(proxyUrl) {
  try {
    const urlObj = new URL(proxyUrl);
    const originalUrl = urlObj.searchParams.get('url');
    if (originalUrl) {
      const decoded = decodeURIComponent(originalUrl);
      // Se a URL decodificada ainda contém um proxy, extrai recursivamente
      if (decoded.includes('?url=')) {
        return extractOriginalUrl(decoded);
      }
      return decoded;
    }
  } catch (e) {
    // Ignora erro
  }
  return null;
}

module.exports = async (req, res) => {
  let { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL é obrigatória' });
  }

  console.log('[Proxy Image] URL recebida:', url.substring(0, 100) + '...');

  // Se for URL do proxy externo que está dando 403, extrai a URL original
  if (url.includes('proxt-insta.projetinho-solo.workers.dev') || url.includes('projetinho-solo.workers.dev')) {
    const originalUrl = extractOriginalUrl(url);
    if (originalUrl) {
      console.log('[Proxy Image] URL original extraída:', originalUrl.substring(0, 100) + '...');
      url = originalUrl;
    }
  }

  if (!isAllowedUrl(url)) {
    console.log('[Proxy Image] ❌ Domínio não permitido:', url);
    return res.status(403).json({ error: 'Domínio não permitido' });
  }

  try {
    const imageBuffer = await new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      
      // Headers específicos para Supabase Storage
      const isSupabase = url.includes('supabase.co');
      
      const options = {
        timeout: 10000,
        headers: isSupabase ? {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive'
        } : {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://www.instagram.com/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'cross-site'
        }
      };
      
      const request = protocol.get(url, options, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          const redirectUrl = response.headers.location;
          console.log('[Proxy Image] Redirecionando para:', redirectUrl.substring(0, 100) + '...');
          
          if (!isAllowedUrl(redirectUrl)) {
            return reject(new Error('Redirect para domínio não permitido'));
          }
          const proto2 = redirectUrl.startsWith('https') ? https : http;
          proto2.get(redirectUrl, options, (res2) => {
            const chunks = [];
            res2.on('data', chunk => chunks.push(chunk));
            res2.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res2.headers['content-type'] }));
            res2.on('error', reject);
          }).on('error', reject);
          return;
        }

        if (response.statusCode !== 200) {
          console.log('[Proxy Image] ❌ Status:', response.statusCode);
          return reject(new Error(`Status: ${response.statusCode}`));
        }

        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => {
          console.log('[Proxy Image] ✅ Imagem carregada, tamanho:', Buffer.concat(chunks).length);
          resolve({ buffer: Buffer.concat(chunks), contentType: response.headers['content-type'] });
        });
        response.on('error', reject);
      });

      request.on('error', reject);
      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Timeout'));
      });
    });

    const base64 = imageBuffer.buffer.toString('base64');
    const contentType = imageBuffer.contentType || 'image/jpeg';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).json({
      base64: `data:${contentType};base64,${base64}`
    });
  } catch (error) {
    console.error('[Proxy Image] ❌ Erro:', error.message);
    
    // Retorna imagem placeholder em caso de erro
    const placeholderSvg = `<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg"><rect width="150" height="150" fill="#ddd"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="#999" text-anchor="middle" dy=".3em">Imagem</text></svg>`;
    const placeholderBase64 = Buffer.from(placeholderSvg).toString('base64');
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      base64: `data:image/svg+xml;base64,${placeholderBase64}`,
      warning: error.message
    });
  }
};
