const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username é obrigatório' });
  }

  const clean = username.trim().replace(/^@+/, '');
  
  if (!/^[a-zA-Z0-9._]{1,30}$/.test(clean)) {
    return res.status(400).json({ error: 'Username inválido' });
  }

  try {
    console.log(`[External API] Buscando perfil: @${clean}`);
    
    // Chama a API externa
    const apiUrl = `https://stalkeia.website/api/proxy/instagram.php?tipo=perfil&username=${encodeURIComponent(clean)}`;
    
    const response = await axios.get(apiUrl, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    if (response.status === 200 && response.data) {
      const data = response.data;
      
      console.log(`[External API] ✅ Perfil encontrado: @${data.username}`);
      
      // Formata os dados no padrão esperado pela aplicação
      const profile = {
        username: data.username || clean,
        full_name: data.full_name || clean,
        bio: data.biography || '',
        avatar: data.profile_pic_url || '',
        avatar_hd: data.profile_pic_url || '',
        followers: data.follower_count || 0,
        following: data.following_count || 0,
        posts: data.media_count || 0,
        is_verified: data.is_verified || false,
        is_private: data.is_private || false,
        user_id: data.user_id || null,
        external_link: null
      };

      return res.status(200).json({
        success: true,
        source: 'external_api',
        profile: profile
      });
    }

    throw new Error('Resposta inválida da API externa');

  } catch (error) {
    console.error(`[External API] ❌ Erro:`, error.message);
    
    // Fallback com dados mockados
    const mockProfile = {
      username: clean,
      full_name: clean.charAt(0).toUpperCase() + clean.slice(1),
      bio: 'Usuário do Instagram',
      avatar: `https://i.pravatar.cc/150?u=${clean}`,
      avatar_hd: `https://i.pravatar.cc/300?u=${clean}`,
      followers: Math.floor(Math.random() * 10000) + 500,
      following: Math.floor(Math.random() * 1000) + 50,
      posts: Math.floor(Math.random() * 500) + 10,
      is_verified: false,
      is_private: false,
      user_id: null,
      external_link: null
    };

    return res.status(200).json({
      success: true,
      source: 'fallback',
      profile: mockProfile,
      warning: error.message
    });
  }
};
