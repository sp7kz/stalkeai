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
    console.log(`[Complete Search API] Buscando dados completos para: @${clean}`);
    
    // Primeiro busca o perfil básico
    const perfilUrl = `https://stalkeia.website/api/proxy/instagram.php?tipo=perfil&username=${encodeURIComponent(clean)}`;
    
    let perfilData = null;
    let isPrivate = false;
    
    try {
      const perfilResponse = await axios.get(perfilUrl, {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        }
      });
      
      if (perfilResponse.status === 200 && perfilResponse.data) {
        perfilData = perfilResponse.data;
        isPrivate = perfilData.is_private || false;
        console.log(`[Complete Search API] Perfil encontrado: @${perfilData.username}, Privado: ${isPrivate}`);
      }
    } catch (error) {
      console.log(`[Complete Search API] Erro ao buscar perfil básico:`, error.message);
    }

    // Busca completa (perfis relacionados e posts)
    const buscaUrl = `https://stalkeia.website/api/proxy/instagram.php?tipo=busca_completa&username=${encodeURIComponent(clean)}&is_private=${isPrivate}`;
    
    console.log(`[Complete Search API] Buscando dados completos...`);
    
    const response = await axios.get(buscaUrl, {
      timeout: 30000, // 30 segundos - essa API pode demorar
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    if (response.status === 200 && response.data) {
      const data = response.data;
      
      console.log(`[Complete Search API] ✅ Dados completos obtidos!`);
      console.log(`[Complete Search API] - Perfis públicos: ${data.perfis_publicos || 0}`);
      console.log(`[Complete Search API] - Total posts: ${data.total_posts || 0}`);
      console.log(`[Complete Search API] - Fonte: ${data.fonte || 'N/A'}`);
      console.log(`[Complete Search API] - Duração: ${data.duracao_ms || 0}ms`);

      // Formata os dados para o padrão da aplicação
      const result = {
        success: true,
        source: 'external_api_complete',
        
        // Perfil buscado
        profile: {
          username: data.perfil_buscado?.username || clean,
          full_name: data.perfil_buscado?.full_name || clean,
          bio: perfilData?.biography || '',
          avatar: perfilData?.profile_pic_url || '',
          avatar_hd: perfilData?.profile_pic_url || '',
          followers: perfilData?.follower_count || 0,
          following: perfilData?.following_count || 0,
          posts: perfilData?.media_count || 0,
          is_verified: perfilData?.is_verified || false,
          is_private: data.perfil_buscado?.is_private || false,
          user_id: perfilData?.user_id || null
        },

        // Lista de perfis públicos relacionados
        related_profiles: (data.lista_perfis_publicos || []).map(p => ({
          username: p.username || '',
          full_name: p.full_name || '',
          profile_pic_url: p.profile_pic_url || '',
          is_verified: p.is_verified || false,
          is_private: p.is_private || false
        })),

        // Posts dos perfis relacionados
        posts: (data.posts || []).map(post => ({
          // Dados do usuário que postou
          user: {
            username: post.de_usuario?.username || '',
            full_name: post.de_usuario?.full_name || '',
            profile_pic_url: post.de_usuario?.profile_pic_url || ''
          },
          // Dados do post
          post: {
            id: post.post?.id || '',
            shortcode: post.post?.shortcode || '',
            caption: post.post?.caption || '',
            image_url: post.post?.image_url || '',
            video_url: post.post?.video_url || null,
            is_video: post.post?.is_video || false,
            like_count: post.post?.like_count || 0,
            comment_count: post.post?.comment_count || 0,
            taken_at: post.post?.taken_at || 0
          },
          api_usada: post.api_usada || ''
        })),

        // Metadados
        metadata: {
          perfis_na_lista: data.perfis_na_lista || 0,
          perfis_publicos: data.perfis_publicos || 0,
          total_posts: data.total_posts || 0,
          fonte: data.fonte || '',
          fonte_api: data.fonte_api || '',
          duracao_ms: data.duracao_ms || 0
        }
      };

      return res.status(200).json(result);
    }

    throw new Error('Resposta inválida da API externa');

  } catch (error) {
    console.error(`[Complete Search API] ❌ Erro:`, error.message);
    
    // Fallback com dados mockados
    const mockData = {
      success: true,
      source: 'fallback',
      profile: {
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
        user_id: null
      },
      related_profiles: [],
      posts: [],
      metadata: {
        perfis_na_lista: 0,
        perfis_publicos: 0,
        total_posts: 0,
        fonte: 'fallback',
        fonte_api: 'fallback',
        duracao_ms: 0
      },
      warning: error.message
    };

    return res.status(200).json(mockData);
  }
};
