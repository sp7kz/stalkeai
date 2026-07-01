import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";
import { preserveParams } from "../utils/navigation";

export default function Notifications() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({ username: "", avatar: "" });
  const [apiProfiles, setApiProfiles] = useState([]);

  // Função para censurar username
  const censorUsername = (username) => {
    if (!username || username.length <= 3) return username;
    const visible = username.substring(0, 3);
    return `${visible}***`;
  };

  useEffect(() => {
    // Carrega perfil espionado
    const profile = JSON.parse(localStorage.getItem('current_profile') || '{}');
    const username = localStorage.getItem('current_username') || '';
    
    setProfileData({
      username: username,
      avatar: profile.profileImageUrl || ''
    });

    // Carrega perfis relacionados da API
    const relatedProfiles = JSON.parse(localStorage.getItem('related_profiles') || '[]');
    const preloadedAvatars = JSON.parse(localStorage.getItem('preloaded_story_avatars') || '[]');
    
    if (relatedProfiles.length > 0) {
      const profiles = relatedProfiles.slice(0, 10).map((profile) => {
        const preloaded = preloadedAvatars.find(a => a.username === profile.username);
        
        return {
          username: censorUsername(profile.username),
          avatar: preloaded?.avatar || `https://i.pravatar.cc/150?u=${profile.username}`
        };
      });
      
      setApiProfiles(profiles);
    }
  }, []);

  return (
    <div className="notif-page">
      <header className="notif-header">
        <div className="notif-header-content">
          <button type="button" className="notif-back-btn" onClick={() => navigate(preserveParams('/feed'))}>
            <svg width="29" height="29" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="notif-header-title">{profileData.username}</h1>
        </div>
      </header>

      <div className="notif-container">
        {/* HOJE */}
        <section className="notif-section">
          <h2 className="notif-section-title">Hoje</h2>
          
          <div className="notif-item" style={{ cursor: 'pointer' }}>
            <div className="notif-row">
              <div className="notif-avatar-col">
                <div className="notif-single-avatar" style={{ position: 'relative' }}>
                  <img alt="" className="notif-avatar-img notif-avatar-full notif-blur" src={apiProfiles[0]?.avatar || "/images/notifications/avatar-blur-1.png"} />
                  <div className="notif-lock-icon">
                    <svg fill="none" stroke="#F9F9F9" viewBox="0 0 24 24" width="18" height="18" style={{ filter: 'drop-shadow(0 0 4px rgb(0, 0, 0))', opacity: 0.85 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="notif-text-col">
                <span className="notif-text">
                  <span className="notif-username">{apiProfiles[0]?.username || "Usuário"}</span> curtiu seu comentário:
                  <span className="notif-content"> Delíciaaaa 😍😍😍</span>
                  <span className="notif-time">48 min</span>
                </span>
              </div>
              <div className="notif-right-col">
                <img alt="" className="notif-thumbnail notif-blur-thumb" width="44" height="44" src="/images/notifications/post-image-1.png" />
              </div>
            </div>
          </div>
        </section>

        {/* ONTEM */}
        <section className="notif-section">
          <h2 className="notif-section-title">Ontem</h2>
          
          {apiProfiles.slice(1, 3).map((profile, index) => (
            <div key={index} className="notif-item" style={{ cursor: 'pointer' }}>
              <div className="notif-row">
                <div className="notif-avatar-col">
                  <div className="notif-single-avatar" style={{ position: 'relative' }}>
                    <img alt="" className="notif-avatar-img notif-avatar-full" src={profile.avatar} />
                  </div>
                </div>
                <div className="notif-text-col">
                  <span className="notif-text">
                    <span className="notif-username">{profile.username}</span> começou a seguir você.
                    <span className="notif-time">{index === 0 ? '9 h' : '12 h'}</span>
                  </span>
                </div>
                <div className="notif-right-col">
                  <button type="button" className="notif-btn notif-btn-secondary">Seguindo</button>
                </div>
              </div>
            </div>
          ))}

          <div className="notif-item" style={{ cursor: 'pointer' }}>
            <div className="notif-row">
              <div className="notif-avatar-col">
                <div className="notif-multi-avatar">
                  <div className="notif-multi-avatar-top">
                    <img alt="" className="notif-avatar-img" src={apiProfiles[3]?.avatar || "/images/notifications/avatar-blur-1.png"} style={{ width: '32px', height: '32px' }} />
                  </div>
                  <div className="notif-multi-avatar-bottom">
                    <img alt="" className="notif-avatar-img" src={apiProfiles[4]?.avatar || "/images/notifications/avatar-blur-1.png"} style={{ width: '32px', height: '32px' }} />
                  </div>
                </div>
              </div>
              <div className="notif-text-col">
                <span className="notif-text">
                  <span className="notif-username">{apiProfiles[3]?.username || "Usuário"}, {apiProfiles[4]?.username || "Usuário"}</span>
                  <span style={{ fontWeight: 'normal' }}> e outras 1 pessoas</span> estão no app Meta AI. Junte-se a elas agora.
                  <span className="notif-time">16 h</span>
                </span>
              </div>
              <div className="notif-right-col">
                <button type="button" className="notif-btn notif-btn-primary">Testar</button>
              </div>
            </div>
          </div>
        </section>

        {/* ÚLTIMOS 7 DIAS */}
        <section className="notif-section">
          <h2 className="notif-section-title">Últimos 7 dias</h2>
          
          {apiProfiles.slice(5, 10).map((profile, index) => (
            <div key={index} className="notif-item" style={{ cursor: 'pointer' }}>
              <div className="notif-row">
                <div className="notif-avatar-col">
                  <div className="notif-single-avatar" style={{ position: 'relative' }}>
                    <img alt="" className="notif-avatar-img notif-avatar-full" src={profile.avatar} />
                  </div>
                </div>
                <div className="notif-text-col">
                  <span className="notif-text">
                    <span className="notif-username">{profile.username}</span> começou a seguir você.
                    <span className="notif-time">{index + 1} d</span>
                  </span>
                </div>
                <div className="notif-right-col">
                  <button type="button" className="notif-btn notif-btn-primary">Seguir</button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* AVISO VIP */}
        <div className="notif-vip-notice">
          <svg fill="currentColor" height="16" viewBox="0 0 24 24" width="16" className="notif-vip-icon">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
            <path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
          </svg>
          <p className="notif-vip-text">
            Somente algumas notificações estão disponíveis para visualização, adquira o plano VIP do Stalkeia.com para liberar todas as atividades.
          </p>
        </div>
      </div>
    </div>
  );
}
