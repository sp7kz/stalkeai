import { useState, useEffect } from "react";
import styles from "./StoriesBar.module.css";
import BlockedScrollPopup from "../ChatComponents/BlockedScrollPopup";
import selfAvatarFallback from "../../assets/feed/perfil-sem-foto.jpeg";
import av1 from "../../assets/feed/av-fallback-1.jpg";
import av2 from "../../assets/feed/av-fallback-2.jpg";
import av3 from "../../assets/feed/av-fallback-3.jpg";
import av4 from "../../assets/feed/av-fallback-4.jpg";
import av5 from "../../assets/feed/av-fallback-5.jpg";
import av6 from "../../assets/feed/av-fallback-6.jpg";
import av7 from "../../assets/feed/av-fallback-7.jpg";
import av8 from "../../assets/feed/av-fallback-8.jpg";
import av9 from "../../assets/feed/av-fallback-9.jpg";
import av10 from "../../assets/feed/av-fallback-10.jpg";

// Stories de fallback
const FALLBACK_STORIES = [
  { name: "Pe*****", type: "locked", avatar: av1 },
  { name: "Lo*****", type: "locked", avatar: av2 },
  { name: "Sw*****", type: "locked", avatar: av3 },
  { name: "En*****", type: "locked", avatar: av4 },
  { name: "La*****", type: "locked", avatar: av5 },
  { name: "fer*****", type: "locked", avatar: av6 },
  { name: "Th*****", type: "locked", avatar: av7 },
  { name: "Be*****", type: "locked", avatar: av8 },
  { name: "So*****", type: "locked", avatar: av9 },
  { name: "Le*****", type: "locked", avatar: av10 },
  { name: "Ma*****", type: "locked", avatar: av1 },
  { name: "Ga*****", type: "locked", avatar: av2 },
  { name: "Is*****", type: "locked", avatar: av3 },
  { name: "Ra*****", type: "locked", avatar: av4 },
  { name: "Lu*****", type: "locked", avatar: av5 },
  { name: "Ca*****", type: "locked", avatar: av6 },
  { name: "Vi*****", type: "locked", avatar: av7 },
  { name: "Fe*****", type: "locked", avatar: av8 },
  { name: "Na*****", type: "locked", avatar: av9 },
  { name: "Di*****", type: "locked", avatar: av10 },
];

export default function StoriesBar() {
  const [showPopup, setShowPopup] = useState(false);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selfAvatar, setSelfAvatar] = useState(selfAvatarFallback);

  // Função para censurar username
  const censorUsername = (username) => {
    if (!username || username.length <= 3) return username;
    const visible = username.substring(0, 3);
    return `${visible}***`;
  };

  // Função para buscar imagem via proxy e converter para base64
  const fetchImageAsBase64 = async (imageUrl) => {
    if (!imageUrl) return null;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

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
      const proxyUrl = `${apiBase}/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
      const res = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!res.ok) return null;
      
      const data = await res.json();
      return data?.base64 || null;
    } catch {
      return null;
    }
  };

  // Carregar perfil principal e perfis relacionados
  useEffect(() => {
    const loadStories = async () => {
      try {
        // Busca foto do perfil espionado (mesma do Home.jsx)
        const profileStr = localStorage.getItem('current_profile');
        console.log('🔍 DEBUG - current_profile do localStorage:', profileStr);
        
        const profile = JSON.parse(profileStr || '{}');
        console.log('🔍 DEBUG - profile parseado:', profile);
        console.log('🔍 DEBUG - profileImageUrl existe?', !!profile.profileImageUrl);
        
        if (profile.profileImageUrl) {
          console.log('✅ Foto do perfil espionado carregada (primeiros 100 chars):', profile.profileImageUrl.substring(0, 100) + '...');
          setSelfAvatar(profile.profileImageUrl);
        } else {
          console.warn('⚠️ profileImageUrl não encontrado no current_profile!');
        }

        // Busca perfis relacionados do localStorage
        const relatedProfiles = JSON.parse(localStorage.getItem('related_profiles') || '[]');
        const preloadedAvatars = JSON.parse(localStorage.getItem('preloaded_story_avatars') || '[]');
        
        console.log('📦 Perfis relacionados carregados:', relatedProfiles.length);
        console.log('📦 Avatares pré-carregados:', preloadedAvatars.length);
        
        if (relatedProfiles.length > 0) {
          const limitedProfiles = relatedProfiles.slice(0, 20);
          
          // Se já tem avatares pré-carregados, usa eles
          if (preloadedAvatars.length > 0) {
            console.log('✅ Usando avatares pré-carregados!');
            
            const formattedStories = limitedProfiles.map((profile, index) => {
              const preloaded = preloadedAvatars.find(a => a.username === profile.username);
              
              return {
                name: censorUsername(profile.username || 'Usuario'),
                type: index < 3 ? "green" : "locked", // Primeiros 3 são verdes
                avatar: preloaded?.avatar || `https://i.pravatar.cc/150?u=${profile.username}`
              };
            });
            
            setStories(formattedStories);
            setLoading(false);
            return;
          }
          
          // Se não tem pré-carregados, carrega normalmente
          console.log('🔄 Convertendo avatares dos stories via proxy...');
          
          const storiesPromises = limitedProfiles.map(async (profile, index) => {
            const avatarBase64 = await fetchImageAsBase64(profile.profile_pic_url);
            
            return {
              name: censorUsername(profile.username || 'Usuario'),
              type: index < 3 ? "green" : "locked", // Primeiros 3 são verdes
              avatar: avatarBase64 || `https://i.pravatar.cc/150?u=${profile.username}`
            };
          });
          
          const formattedStories = await Promise.all(storiesPromises);
          setStories(formattedStories);
          console.log('✅ Stories formatados:', formattedStories.length);
        } else {
          console.log('⚠️ Nenhum perfil relacionado, usando fallback');
          setStories(FALLBACK_STORIES);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar stories:', error);
        setStories(FALLBACK_STORIES);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  return (
    <>
      <section className={styles.storiesWrapper}>
        <div className={styles.storiesContainer}>

          {/* SEU STORY */}
          <div className={styles.storyItem}>
            <button className={styles.storyButton} onClick={() => setShowPopup(true)}>
              <div className={`${styles.storyRing} ${styles.self}`}>
                <div className={styles.storyAvatar}>
                  <img src={selfAvatar} alt="Seu story" />
                </div>
                <div className={styles.addStory}>
                  <span>+</span>
                </div>
              </div>
            </button>
            <span className={styles.storyUsername}>Seu story</span>
          </div>

          {/* STORIES DA API */}
          {loading ? (
            // Loading skeleton
            Array.from({ length: 10 }).map((_, index) => (
              <div className={styles.storyItem} key={`skeleton-${index}`}>
                <div className={styles.storyButton}>
                  <div className={`${styles.storyRing} ${styles.locked}`}>
                    <div className={styles.storyAvatar} style={{ background: '#f0f0f0' }}>
                      {/* Skeleton */}
                    </div>
                  </div>
                </div>
                <span className={styles.storyUsername}>...</span>
              </div>
            ))
          ) : (
            stories.map((story, index) => (
              <div className={styles.storyItem} key={index}>
                <button className={styles.storyButton} onClick={() => setShowPopup(true)}>
                  <div className={`${styles.storyRing} ${styles[story.type]}`}>
                    <div className={styles.storyAvatar}>
                      <img src={story.avatar} alt={story.name} />
                    </div>
                  </div>
                </button>
                <span className={styles.storyUsername}>{story.name}</span>
              </div>
            ))
          )}

        </div>
      </section>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="🔒 Story bloqueado"
        description="Seja um membro VIP do Stalkea.ai para visualizar stories"
      />
    </>
  );
}
