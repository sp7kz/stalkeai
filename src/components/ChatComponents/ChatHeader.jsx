import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ChatHeader.module.css";
import BlockedScrollPopup from "./BlockedScrollPopup";
import { preserveParams } from "../../utils/navigation";

import backIcon from "../../assets/chat/setaparaolado2.svg";
import phoneIcon from "../../assets/chat/telefone.svg";
import videoIcon from "../../assets/chat/video.svg";
import avatarFallback from "../../assets/chat/perfil-sem-foto.jpeg";
import chat1Avatar from "../../assets/direct/chat1.png";

export default function ChatHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [chatData, setChatData] = useState({
    avatar: chat1Avatar,
    username: "fer******"
  });

  // Função para censurar username
  const censorUsername = (username) => {
    if (!username || username.length <= 3) return username;
    const visible = username.substring(0, 3);
    return `${visible}***`;
  };

  useEffect(() => {
    // Identifica qual chat está aberto pela rota
    const chatNumber = location.pathname.match(/\/chat(\d+)/)?.[1];
    
    if (chatNumber) {
      const chatIndex = parseInt(chatNumber) - 1; // chat1 = index 0, chat2 = index 1, etc
      
      // Chat 1 sempre usa dados mockados (fer*****)
      if (chatIndex === 0) {
        setChatData({
          avatar: chat1Avatar,
          username: "fer******"
        });
        return;
      }
      
      // Chats 2-5 usam dados da API
      const relatedProfiles = JSON.parse(localStorage.getItem('related_profiles') || '[]');
      const preloadedAvatars = JSON.parse(localStorage.getItem('preloaded_story_avatars') || '[]');
      
      if (relatedProfiles.length > chatIndex - 1) {
        const profile = relatedProfiles[chatIndex - 1]; // chat2 usa index 0, chat3 usa index 1, etc
        const preloaded = preloadedAvatars.find(a => a.username === profile.username);
        
        setChatData({
          avatar: preloaded?.avatar || `https://i.pravatar.cc/150?u=${profile.username}`,
          username: censorUsername(profile.username)
        });
      }
    }
  }, [location.pathname]);

  return (
    <>
      <div className={styles.chatPageHeader}>
        <div className={styles.chatPageHeaderLeft}>
          <button className={styles.chatPageBackButton} aria-label="Voltar" onClick={() => navigate(preserveParams('/direct'))}>
            <img src={backIcon} alt="Voltar" />
          </button>

          <div className={styles.chatPageUserInfo}>
            <button className={styles.chatPageAvatarBtn} aria-label="Avatar">
              <span className={styles.chatPageAvatarGradient}>
                <span className={styles.chatPageAvatarInner}>
                  <img
                    src={chatData.avatar}
                    alt=""
                    className={styles.chatPageAvatarImg}
                  />
                </span>
              </span>
            </button>

            <button className={styles.chatPageNameBtn}>
              <span className={styles.chatPageUserName}>{chatData.username}</span>
              <span className={styles.chatPageUserStatus}>Online</span>
            </button>
          </div>
        </div>

        <div className={styles.chatPageHeaderRight}>
          <button className={styles.chatPageHeaderIconBtn} aria-label="Ligação de áudio" onClick={() => setShowPopup(true)}>
            <img src={phoneIcon} alt="Áudio" />
          </button>

          <button className={styles.chatPageHeaderIconBtn} aria-label="Ligação de vídeo" onClick={() => setShowPopup(true)}>
            <img src={videoIcon} alt="Vídeo" />
          </button>
        </div>
      </div>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="⚠️ Ação bloqueada"
        description="Seja um membro VIP do Stalkea.ai para realizar chamadas"
      />
    </>
  );
}