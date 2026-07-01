import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BlockedScrollPopup from "../ChatComponents/BlockedScrollPopup";
import styles from "./DirectItem.module.css";
import { preserveParams } from "../../utils/navigation";

import chat1Av from "../../assets/direct/chat1.png";
import av7 from "../../assets/direct/av-fallback-7.jpg";
import av3 from "../../assets/direct/av-fallback-3.jpg";
import chat2Av from "../../assets/direct/chat2.png";
import chat3Av from "../../assets/direct/chat3.png";
import av9 from "../../assets/direct/av-fallback-9.jpg";
import av10 from "../../assets/direct/av-fallback-10.jpg";
import av12 from "../../assets/direct/av-fallback-12.jpg";
import av4 from "../../assets/direct/av-fallback-4.jpg";
import av11 from "../../assets/direct/av-fallback-11.jpg";
import av8 from "../../assets/direct/av-fallback-8.jpg";
import av6 from "../../assets/direct/av-fallback-6.jpg";

export default function DirectItem({ lockedRef }) {
  const navigate = useNavigate();
  const [apiChats, setApiChats] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Função para censurar username
  const censorUsername = (username) => {
    if (!username || username.length <= 3) return username;
    const visible = username.substring(0, 3);
    return `${visible}***`;
  };

  useEffect(() => {
    // Carrega perfis relacionados da API para os chats 2-5
    const relatedProfiles = JSON.parse(localStorage.getItem('related_profiles') || '[]');
    const preloadedAvatars = JSON.parse(localStorage.getItem('preloaded_story_avatars') || '[]');
    
    if (relatedProfiles.length >= 4) {
      const chats = relatedProfiles.slice(0, 4).map((profile, index) => {
        const preloaded = preloadedAvatars.find(a => a.username === profile.username);
        const messages = [
          "Encaminhou um reel de jonas.milgrau",
          "Blz depois a gente se fala",
          "Reagiu com 👍 à sua mensagem",
          "4 novas mensagens"
        ];
        const times = ["33 min", "2 h", "6 h", "22 h"];
        const unread = [true, false, false, true];
        
        return {
          name: censorUsername(profile.username),
          avatar: preloaded?.avatar || `https://i.pravatar.cc/150?u=${profile.username}`,
          message: messages[index],
          time: times[index],
          isUnread: unread[index],
          chatNumber: index + 2 // 2, 3, 4, 5
        };
      });
      
      setApiChats(chats);
    }
  }, []);

  return (
    <>
      {/* SVG — NÃO MEXER (MANTER EXATAMENTE IGUAL) */}
      <svg style={{ display: "none" }}>
        <symbol id="camera-icon" viewBox="0 0 66 64" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.743 0.806959C22.974 1.01696 20.854 2.54296 18.826 5.06696C16.383 8.10696 14.966 9.00096 12.583 9.00396C10.887 9.00596 8.01 9.91596 6.19 11.026C0.838 14.289 0 17.748 0 36.582C0 51.783 0.187 53.561 2.159 57.069C5.68 63.333 8.651 64 33.052 64C55.815 64 58.402 63.529 63 58.551C65.45 55.898 65.506 55.477 65.811 37.491C66.071 22.148 65.858 18.626 64.513 16.024C62.544 12.217 57.524 9.00896 53.527 9.00396C51.336 9.00096 49.627 7.96696 47.027 5.07196C43.551 1.19996 43.384 1.13796 35.5 0.811961C31.1 0.629961 26.259 0.627959 24.743 0.806959ZM43.216 9.57496C44.622 12.66 48.789 15 52.878 15C54.903 15 56.518 15 56.518 15C59.35 15 57.5 12.313 57.5 33.052C57.5 62.313 59.35 57.5 33.052 57.5C3.655 57.5 6 59.35 6 36.204C6 20.562 6.122 19.499 8.174 17.314C9.469 15.936 11.511 15 13.224 15C17.15 15 21.289 12.696 22.954 9.58496C24.282 7.10396 24.693 6.99996 33.19 6.99996C41.731 6.99996 42.084 7.09096 43.216 9.57496ZM27 19.722C15.76 23.945 13.183 40.493 22.611 47.908C30.698 54.27 42.974 51.753 47.612 42.783C51.201 35.844 48.564 25.701 42.015 21.25C38.771 19.046 30.925 18.247 27 19.722ZM40.077 27.923C46.612 34.459 42.201 45.273 33 45.273C23.799 45.273 19.388 34.459 25.923 27.923C30.039 23.807 35.961 23.807 40.077 27.923Z"
            fill="#F9F9F9"
          />
        </symbol>
      </svg>

      {/* ===== 5 CHATS CLICÁVEIS ===== */}

      {/* CHAT 1 — UNREAD */}
      <div className={`${styles.chatItem} ${styles.chatUnread}`} onClick={() => navigate(preserveParams('/chat1'))} style={{ cursor: 'pointer' }}>
        <div className={styles.chatAvatarContainer}>
          <div className={styles.chatAvatarWrapper}>
            <img className={`${styles.chatPhoto} ${styles.blurred}`} src={chat1Av} alt="" />
          </div>
        </div>
        <div className={styles.chatContent}>
          <h3 className={styles.chatName}>fer*****</h3>
          <div className={styles.chatMessageRow}>
            <span className={styles.chatMessageText}>G adivinha o que vc esqueceu aqui? kkkkk</span>
            <span className={styles.chatTime}> · Agora</span>
          </div>
        </div>
        <div className={styles.chatActions}>
          <span className={styles.chatUnreadDot} />
          <svg className={styles.chatCameraIcon} width="19.2" height="19.2">
            <use href="#camera-icon" />
          </svg>
        </div>
      </div>

      {/* CHAT 2-5 — DADOS DA API */}
      {apiChats.length > 0 ? (
        apiChats.map((chat, index) => (
          <div 
            key={index}
            className={`${styles.chatItem} ${chat.isUnread ? styles.chatUnread : ''}`} 
            onClick={() => navigate(preserveParams(`/chat${chat.chatNumber}`))} 
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.chatAvatarContainer}>
              <div className={styles.chatAvatarWrapper}>
                <img className={`${styles.chatPhoto} ${styles.blurred}`} src={chat.avatar} alt="" />
              </div>
            </div>
            <div className={styles.chatContent}>
              <h3 className={styles.chatName}>{chat.name}</h3>
              <div className={styles.chatMessageRow}>
                <span className={styles.chatMessageText}>{chat.message}</span>
                <span className={styles.chatTime}> · {chat.time}</span>
              </div>
            </div>
            <div className={styles.chatActions}>
              {chat.isUnread && <span className={styles.chatUnreadDot} />}
              <svg className={styles.chatCameraIcon} width="19.2" height="19.2">
                <use href="#camera-icon" />
              </svg>
            </div>
          </div>
        ))
      ) : (
        // Fallback caso não tenha dados da API
        <>
          {/* CHAT 2 — UNREAD */}
          <div className={`${styles.chatItem} ${styles.chatUnread}`} onClick={() => navigate(preserveParams('/chat2'))} style={{ cursor: 'pointer' }}>
            <div className={styles.chatAvatarContainer}>
              <div className={styles.chatAvatarWrapper}>
                <img className={`${styles.chatPhoto} ${styles.blurred}`} src={av7} alt="" />
              </div>
            </div>
            <div className={styles.chatContent}>
              <h3 className={styles.chatName}>Mel*****</h3>
              <div className={styles.chatMessageRow}>
                <span className={styles.chatMessageText}>Encaminhou um reel de jonas.milgrau</span>
                <span className={styles.chatTime}> · 33 min</span>
              </div>
            </div>
            <div className={styles.chatActions}>
              <span className={styles.chatUnreadDot} />
              <svg className={styles.chatCameraIcon} width="19.2" height="19.2">
                <use href="#camera-icon" />
              </svg>
            </div>
          </div>

          {/* CHAT 3 */}
          <div className={styles.chatItem} onClick={() => navigate(preserveParams('/chat3'))} style={{ cursor: 'pointer' }}>
            <div className={styles.chatAvatarContainer}>
              <div className={styles.chatAvatarWrapper}>
                <img className={`${styles.chatPhoto} ${styles.blurred}`} src={av3} alt="" />
              </div>
            </div>
            <div className={styles.chatContent}>
              <h3 className={styles.chatName}>Ped*****</h3>
              <div className={styles.chatMessageRow}>
                <span className={styles.chatMessageText}>Blz depois a gente se fala</span>
                <span className={styles.chatTime}> · 2 h</span>
              </div>
            </div>
            <div className={styles.chatActions}>
              <svg className={styles.chatCameraIcon} width="19.2" height="19.2">
                <use href="#camera-icon" />
              </svg>
            </div>
          </div>

          {/* CHAT 4 */}
          <div className={styles.chatItem} onClick={() => navigate(preserveParams('/chat4'))} style={{ cursor: 'pointer' }}>
            <div className={styles.chatAvatarContainer}>
              <div className={styles.chatAvatarWrapper}>
                <img className={`${styles.chatPhoto} ${styles.blurred}`} src={chat2Av} alt="" />
              </div>
            </div>
            <div className={styles.chatContent}>
              <h3 className={styles.chatName}>And*****</h3>
              <div className={styles.chatMessageRow}>
                <span className={styles.chatMessageText}>Reagiu com 👍 à sua mensagem</span>
                <span className={styles.chatTime}> · 6 h</span>
              </div>
            </div>
            <div className={styles.chatActions}>
              <svg className={styles.chatCameraIcon} width="19.2" height="19.2">
                <use href="#camera-icon" />
              </svg>
            </div>
          </div>

          {/* CHAT 5 — UNREAD */}
          <div className={`${styles.chatItem} ${styles.chatUnread}`} onClick={() => navigate(preserveParams('/chat5'))} style={{ cursor: 'pointer' }}>
            <div className={styles.chatAvatarContainer}>
              <div className={styles.chatAvatarWrapper}>
                <img className={`${styles.chatPhoto} ${styles.blurred}`} src={chat3Av} alt="" />
              </div>
            </div>
            <div className={styles.chatContent}>
              <h3 className={styles.chatName}>𝕭𝖗𝖚****</h3>
              <div className={styles.chatMessageRow}>
                <span className={styles.chatMessageText}>4 novas mensagens</span>
                <span className={styles.chatTime}> · 22 h</span>
              </div>
            </div>
            <div className={styles.chatActions}>
              <span className={styles.chatUnreadDot} />
              <svg className={styles.chatCameraIcon} width="19.2" height="19.2">
                <use href="#camera-icon" />
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Sentinel entre chats acessíveis e bloqueados */}
      <div ref={lockedRef} />

      {/* ===== CHATS BLOQUEADOS (COM CADEADO) ===== */}
      {[
        { name: "The*****", avatar: av9, time: "2 d", message: "Enviou um reel de dr.diegooficial" },
        { name: "Bea*****", avatar: av10, time: "2 d", message: "Enviado sexta-feira" },
        { name: "Sop*****", avatar: av12, time: "2 d", message: "Enviou uma mensagem de voz" },
        { name: "Lau*****", avatar: av4, time: "2 d", message: "kkkkkkkkkk" },
        { name: "Enz*****", avatar: av11, time: "2 d", message: "Curtiu sua mensagem" },
        { name: "Júl*****", avatar: av8, time: "3 d", message: "🔥🔥" },
        { name: "Fer*****", avatar: av6, time: "3 d", message: "Enviado quinta-feira" },
        { name: "Mel*****", avatar: av9, time: "3 d", message: "Enviado segunda-feira" },
        { name: "Ped*****", avatar: av10, time: "4 d", message: "Delícia você 😈 😈" },
        { name: "Fel*****", avatar: av11, time: "4 d", message: "Curtiu sua mensagem" },
        { name: "Dan*****", avatar: av4, time: "6 d", message: "Enviado quinta-feira" },
        { name: "Fel*****", avatar: av8, time: "1 sem", message: "Respondeu com 👍" },
        { name: "Isa*****", avatar: av6, time: "1 sem", message: "Enviou uma foto" },
        { name: "Raf*****", avatar: av12, time: "1 sem", message: "Vem cá 😏" },
        { name: "Bia*****", avatar: av9, time: "2 sem", message: "Respondeu ao seu story" },
        { name: "Gui*****", avatar: av4, time: "2 sem", message: "Curtiu sua mensagem" },
        { name: "Mar*****", avatar: av11, time: "2 sem", message: "Enviou um reel" },
        { name: "Vic*****", avatar: av10, time: "3 sem", message: "Saudades 💕" },
      ].map(({ name, avatar, time, message }, i) => (
        <div 
          className={`${styles.chatItem} ${styles.chatLocked}`} 
          key={i}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Chat bloqueado clicado!');
            setShowPopup(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.chatAvatarContainer}>
            <div className={`${styles.chatAvatarWrapper} ${styles.locked}`}>
              <img className={`${styles.chatPhoto} ${styles.blurred}`} src={avatar} alt="" />
              <div className={styles.chatLockOverlay}>
                <svg
                  className={styles.chatLockIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 10V8a6 6 0 0112 0v2"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.chatContent}>
            <h3 className={styles.chatName}>{name}</h3>
            <div className={styles.chatMessageRow}>
              <span className={styles.chatMessageText}>{message}</span>
              <span className={styles.chatTime}> · {time}</span>
            </div>
          </div>
          <div className={styles.chatActions}>
            <svg className={styles.chatCameraIcon} width="19.2" height="19.2">
              <use href="#camera-icon" />
            </svg>
          </div>
        </div>
      ))}

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="⚠︎ Conversa bloqueada"
        description="Seja um membro VIP do Stalkeia.com para acessar todas as conversas"
      />
    </>
  );
}