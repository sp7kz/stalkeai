import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './InstagramLogin.module.css';

const InstagramLogin = ({ username, onLoginComplete }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('testing'); // testing, success
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cryptoText, setCryptoText] = useState('Quebrando criptografia da conta...');
  const [cryptoSubtext, setCryptoSubtext] = useState('Testando combinações de senha...');
  const [progress, setProgress] = useState(0);
  const [followingList, setFollowingList] = useState([]);
  const [followingLoaded, setFollowingLoaded] = useState(false);
  const [completeSearchDone, setCompleteSearchDone] = useState(false);
  
  const passwordsRef = useRef([]);
  const typingInterval = useRef(null);
  const cryptoInterval = useRef(null);
  const currentIndex = useRef(0);
  const isMounted = useRef(true);
  const typingSpeed = useRef(30);
  const completeSearchDoneRef = useRef(false);
  const hasRedirected = useRef(false); // Controla se já redirecionou

  // Gerar senhas realistas (menos tentativas)
  useEffect(() => {
    const generatePasswords = () => {
      const bases = [
        "amordeverdade", "familiaunida", "filhoquerido", "casanova",
        "viagemsonho", "praiabonita", "festaboa", "trabalhoduro",
        "faculdadevida", "namoradolindo", "casalfeliz", "vidaperfeita",
        "segredomeusso", "princesinha", "coracaoquente"
      ];

      const suffixes = [
        "2024", "2025", "321", "abc", "xyz", "0101", "1234",
        "real", "top", "vip", "gold"
      ];

      const specials = "!@#$%&*";

      const passwords = [];

      for (let i = 0; i < 3; i++) {
        const base = bases[Math.floor(Math.random() * bases.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        let password = base + suffix;

        if (Math.random() > 0.5) {
          password += specials[Math.floor(Math.random() * specials.length)];
        }

        passwords.push(password);
      }

      const finalPasswords = [
        "minhavida2024!real",
        "familiaUnida#2025",
        "amorEterno@forever",
        "segredoNosso$321",
        "coracaoQuente!abc"
      ];

      passwords.push(finalPasswords[Math.floor(Math.random() * finalPasswords.length)]);

      return passwords;
    };
    
    passwordsRef.current = generatePasswords();
  }, []);

  // Iniciar animação de criptografia
  useEffect(() => {
    const cryptoMessages = [
      "Quebrando criptografia da conta",
      "Quebrando criptografia da conta",
      "Quebrando criptografia da conta"
    ];

    cryptoInterval.current = setInterval(() => {
      const randomMsg = cryptoMessages[0];
      const randomSub = "Testando senha...";
      
      if (isMounted.current && status === 'testing') {
        setCryptoText(randomMsg);
        setCryptoSubtext(randomSub);
      }
    }, 1200);

    return () => {
      clearInterval(cryptoInterval.current);
    };
  }, [status]);

  // Buscar dados completos em background
  useEffect(() => {
    const fetchCompleteSearch = async () => {
      if (!username) return;

      const cleanUsername = username.trim().replace(/^@+/, '');
      
      try {
        console.log('🔍 Iniciando busca completa para:', cleanUsername);
        
        const getApiBase = () => {
          const envBase = process.env.REACT_APP_API_BASE;
          if (envBase && envBase.trim()) {
            return envBase.trim().replace(/\/+$/, '');
          }
          if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:5000';
          }
          return '';
        };

        const apiBase = getApiBase();
        const apiUrl = `${apiBase}/api/get-complete-search?username=${encodeURIComponent(cleanUsername)}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        const response = await fetch(apiUrl, {
          signal: controller.signal,
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Busca completa finalizada:', data);

        if (data.success) {
          localStorage.setItem('related_profiles', JSON.stringify(data.related_profiles || []));
          localStorage.setItem('related_posts', JSON.stringify(data.posts || []));
          localStorage.setItem('search_metadata', JSON.stringify(data.metadata || {}));

          console.log('💾 Dados completos salvos no localStorage:');
          console.log('- Perfil principal:', data.profile?.username);
          console.log('- Perfis relacionados:', data.related_profiles?.length || 0);
          console.log('- Posts:', data.posts?.length || 0);

          console.log('📦 Pré-carregando imagens em base64...');
          await preloadImagesAsBase64(data, apiBase);

          if (data.related_profiles && data.related_profiles.length > 0) {
            setFollowingList(data.related_profiles.slice(0, 10));
          }
          setFollowingLoaded(true);
          setCompleteSearchDone(true);
          completeSearchDoneRef.current = true;

          console.log('✅ Todas as imagens pré-carregadas!');
        }

      } catch (error) {
        console.error('❌ Erro ao buscar dados completos:', error);
        setFollowingLoaded(true);
        setCompleteSearchDone(true);
        completeSearchDoneRef.current = true;
      }
    };

    const preloadImagesAsBase64 = async (data, apiBase) => {
      try {
        const fetchImageAsBase64 = async (imageUrl) => {
          if (!imageUrl) return null;
          
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const proxyUrl = `${apiBase}/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
            const res = await fetch(proxyUrl, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (!res.ok) return null;
            
            const responseData = await res.json();
            return responseData?.base64 || null;
          } catch {
            return null;
          }
        };

        const relatedProfiles = data.related_profiles || [];
        const limitedProfiles = relatedProfiles.slice(0, 20);
        
        console.log(`🔄 Pré-carregando ${limitedProfiles.length} avatares de stories...`);
        const avatarPromises = limitedProfiles.map(async (profile) => {
          const base64 = await fetchImageAsBase64(profile.profile_pic_url);
          return { username: profile.username, avatar: base64 };
        });
        
        const avatarsBase64 = await Promise.all(avatarPromises);
        localStorage.setItem('preloaded_story_avatars', JSON.stringify(avatarsBase64));
        console.log(`✅ ${avatarsBase64.filter(a => a.avatar).length} avatares de stories pré-carregados`);

        const posts = data.posts || [];
        const limitedPosts = posts.slice(0, 30);
        
        console.log(`🔄 Pré-carregando ${limitedPosts.length} imagens de posts...`);
        const postPromises = limitedPosts.map(async (item, index) => {
          const avatarBase64 = await fetchImageAsBase64(item.user?.profile_pic_url);
          const postImageUrl = item.post?.image_url || item.post?.video_url || '';
          const postImageBase64 = await fetchImageAsBase64(postImageUrl);
          
          return {
            index,
            avatar: avatarBase64,
            postImage: postImageBase64
          };
        });
        
        const postsBase64 = await Promise.all(postPromises);
        localStorage.setItem('preloaded_post_images', JSON.stringify(postsBase64));
        console.log(`✅ ${postsBase64.filter(p => p.postImage).length} imagens de posts pré-carregadas`);

      } catch (error) {
        console.error('❌ Erro ao pré-carregar imagens:', error);
      }
    };

    const timer = setTimeout(() => {
      fetchCompleteSearch();
    }, 1000);

    return () => clearTimeout(timer);
  }, [username]);

  // Simular digitação
  const simulateTyping = useCallback((text, onComplete) => {
    if (!isMounted.current) return;
    
    let typed = '';
    let index = 0;
    
    clearInterval(typingInterval.current);
    
    typingInterval.current = setInterval(() => {
      if (index < text.length && isMounted.current) {
        typed += text[index];
        setPassword('•'.repeat(typed.length));
        index++;
      } else {
        clearInterval(typingInterval.current);
        setPassword('•'.repeat(text.length));
        if (onComplete) onComplete();
      }
    }, typingSpeed.current);
  }, []);

  // Iniciar simulação de hacking
  const startHackingSimulation = useCallback(async () => {
    if (!isMounted.current) return;
    
    const totalAttempts = passwordsRef.current.length;
    let attemptIndex = 0;
    
    while (isMounted.current && !completeSearchDoneRef.current) {
      const currentPass = passwordsRef.current[attemptIndex % totalAttempts];
      
      setProgress(prev => Math.min(95, prev + (Math.random() * 5)));
      
      await new Promise(resolve => {
        simulateTyping(currentPass, resolve);
      });
      
      if (completeSearchDoneRef.current) {
        console.log('✅ API retornou durante digitação, parando!');
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));

      if (completeSearchDoneRef.current) {
        console.log('✅ API retornou, parando!');
        break;
      }

      setShowError(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setShowError(false);

      if (completeSearchDoneRef.current) {
        console.log('✅ API retornou após erro, parando!');
        break;
      }

      setPassword('');
      await new Promise(resolve => setTimeout(resolve, 150));
      
      attemptIndex++;
    }

    if (completeSearchDoneRef.current && isMounted.current) {
      const finalPass = passwordsRef.current[passwordsRef.current.length - 1];
      
      console.log('🎉 Mostrando sucesso!');
      
      setStatus('success');
      setProgress(100);
      setCryptoText('Teste gerado');
      setCryptoSubtext('Acesso liberado à conta!');

      clearInterval(cryptoInterval.current);

      await new Promise(resolve => setTimeout(resolve, 300));
      setShowPassword(true);
      setPassword(finalPass);
    }
  }, [simulateTyping]);

  // Efeito principal
  useEffect(() => {
    isMounted.current = true;
    let startTimer = null;
    
    startTimer = setTimeout(() => {
      if (isMounted.current) {
        startHackingSimulation();
      }
    }, 600);
    
    return () => {
      isMounted.current = false;
      if (typingInterval.current) clearInterval(typingInterval.current);
      if (cryptoInterval.current) clearInterval(cryptoInterval.current);
      if (startTimer) clearTimeout(startTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (completeSearchDone && status === 'testing') {
      console.log('✅ API retornou, finalizando simulação de senhas...');
    }
  }, [completeSearchDone, status]);

  const getPasswordDisplay = () => {
    if (status === 'success' && showPassword) {
      return password;
    }
    return password;
  };

  const handleLoginClick = () => {
    // Não faz nada - o redirecionamento é automático
  };

  // Redirecionar automaticamente após sucesso
  useEffect(() => {
    if (status === 'success' && completeSearchDone && !hasRedirected.current) {
      console.log('✅ Condições atendidas! Redirecionando em 3 segundos...');
      hasRedirected.current = true; // Marca que já iniciou o redirecionamento
      
      const timer = setTimeout(() => {
        console.log('🚀 Redirecionando agora!');
        onLoginComplete();
      }, 3000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status, completeSearchDone]);

  return (
    <div className={styles.instagramLoginScreen}>
      <div className={styles.instagramContainer}>
        
        {/* Logo Instagram */}
        <div className={styles.instagramLogo}>
          <img 
            src="/images/logos/logo-insta.png" 
            alt="Instagram"
            className={styles.instaLogoImg}
          />
        </div>

        {/* Formulário */}
        <div className={styles.instagramForm}>
          
          {/* Username Input */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <div className={styles.formInput}>
                {username}
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                value={getPasswordDisplay()}
                readOnly
                className={`${styles.formInput} ${styles.passwordInput} ${status === 'success' ? styles.success : ''}`}
                placeholder="Senha"
              />
            </div>
            
            {showError && status === 'testing' && (
              <div className={styles.errorMessage}>
                A senha que você inseriu está incorreta.
              </div>
            )}
          </div>

          {/* Quebrando Criptografia */}
          {status === 'testing' && (
            <div className={styles.cryptoBreaking}>
              <div className={styles.cryptoHeader}>
                <div className={styles.cryptoIcon}>
                  <svg className={styles.cryptoSpinner} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" 
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className={styles.cryptoText}>
                  <p className={styles.cryptoMain}>{cryptoText}</p>
                  <p className={styles.cryptoSub}>{cryptoSubtext}</p>
                </div>
              </div>
            </div>
          )}

          {/* Login Button */}
          <button 
            type="button"
            className={`${styles.loginBtn} ${status === 'success' && completeSearchDone ? styles.active : ''}`}
            disabled={true}
            onClick={handleLoginClick}
          >
            {status === 'success' && completeSearchDone ? 'Entrando...' : (status === 'success' ? 'Carregando dados...' : 'Entrar')}
          </button>

          {/* Esqueceu a senha */}
          <div className={styles.forgotPassword}>
            <a href="#" className={styles.forgotLink}>Esqueceu a senha?</a>
          </div>

          {/* Separador OU */}
          <div className={styles.separator}>
            <div className={styles.line}></div>
            <span className={styles.or}>OU</span>
            <div className={styles.line}></div>
          </div>

          {/* Facebook Login */}
          <div className={styles.facebookLogin}>
            <svg className={styles.fbIcon} fill="#385185" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
            </svg>
            <span className={styles.fbText}>Entrar com o Facebook</span>
          </div>

        </div>

        {/* Card de cadastro */}
        <div className={styles.signupCard}>
          <p className={styles.signupText}>
            Não tem uma conta? <a href="#" className={styles.signupLink}>Cadastre-se.</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default InstagramLogin;
