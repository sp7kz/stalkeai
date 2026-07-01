import { useState, useEffect } from "react";
import BlockedScrollPopup from "../ChatComponents/BlockedScrollPopup";
import styles from "./DirectStories.module.css";

import perfilEspionado from "../../assets/direct/perfil-sem-foto.jpeg";
import avatar1 from "../../assets/direct/av-fallback-1.jpg";
import avatar2 from "../../assets/direct/av-fallback-2.jpg";
import avatar3 from "../../assets/direct/av-fallback-3.jpg";
import avatar4 from "../../assets/direct/av-fallback-4.jpg";
import avatar5 from "../../assets/direct/av-fallback-5.jpg";
import avatar6 from "../../assets/direct/av-fallback-6.jpg";
import avatar7 from "../../assets/direct/av-fallback-7.jpg";
import avatar8 from "../../assets/direct/av-fallback-8.jpg";
import avatar9 from "../../assets/direct/av-fallback-9.jpg";
import swing from "../../assets/direct/StorySwing.png";
import playboy from "../../assets/direct/playboy.jpg";

/* ===============================
   NOTA DE MÚSICA
   =============================== */

const MusicNote = ({ music }) => {
  const isShortTitle = music.title === "APT.";

  return (
    <div className={styles.musicNoteContent}>
      <div className={styles.musicHeader}>
        <div className={styles.musicIcon}>
          <svg viewBox="0 0 24 30" width="8" height="10">
            <rect height="19" rx="2" width="4" y="5" />
            <rect height="21" rx="2" width="4" x="10" y="4" />
            <rect height="19" rx="2" width="4" x="20" y="5" />
          </svg>
        </div>

        {isShortTitle ? (
          <span className={styles.musicTitle}>APT.</span>
        ) : (
          <div className={styles.musicTitleContainer}>
            <span className={`${styles.musicTitle} ${styles.scrolling}`}>
              {music.title}
              <span className={styles.musicGap}>{music.title}</span>
            </span>
          </div>
        )}
      </div>

      <span className={styles.musicArtist}>{music.artist}</span>
    </div>
  );
};

/* ===============================
   STORIES DATA
   =============================== */

const OTHER_STORIES = [
  {
    name: "Ped*******",
    note: "Preguiça Hoje 🥱🥱",
    avatar: avatar1,
    blurred: true
  },
  {
    name: "Lor*******",
    isMusicNote: true,
    music: {
      title: "Coração Partido (Ao Vivo)",
      artist: "Grupo Menos É Mais"
    },
    avatar: avatar2,
    blurred: true
  },
  {
    name: "Swi*******",
    note: "O vontde fudê a 3 😈",
    avatar: swing,
    blurred: true
  },
  {
    name: "Enz*******",
    note: "25/01❤️",
    avatar: avatar3,
    blurred: true
  },
  {
    name: "Lau*******",
    note: "Alguém??",
    avatar: avatar4,
    blurred: true
  },
  {
    name: "Joã*******",
    isMusicNote: true,
    music: {
      title: "365 Dias (Vida Mansa)",
      artist: "MC Marks, MC Ryan SP, MC Jvila, MC Bruno MS, MC Magal"
    },
    avatar: avatar5,
    blurred: true
  },
  {
    name: "The*******",
    note: "Já não aguento mais!",
    avatar: avatar6,
    blurred: true
  },
  {
    name: "Bea*******",
    isMusicNote: true,
    music: {
      title: "APT.",
      artist: "Rosé & Bruno Mars"
    },
    avatar: avatar7,
    blurred: true
  },
  {
    name: "Sop*******",
    isMusicNote: true,
    music: {
      title: "Whats I've Done",
      artist: "Link Park"
    },
    avatar: avatar8,
    blurred: true
  },
  {
    name: "Let*******",
    isMusicNote: true,
    music: {
      title: "Oh Garota Eu Quero Você Só Pra Mim",
      artist: "Oruam, Zé Felipe, MC Tuto, MC Rodrigo Do CN"
    },
    avatar: avatar9,
    blurred: true
  },
  {
    name: "Marc*******",
    note: "📍💦",
    avatar: playboy,
    blurred: true
  }
];

export default function DirectStories() {
  const [apiStories, setApiStories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  
  // Função para censurar username
  const censorUsername = (username) => {
    if (!username || username.length <= 3) return username;
    const visible = username.substring(0, 3);
    return `${visible}***`;
  };

  useEffect(() => {
    // Pega a data atual no formato DD/MM
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const currentDate = `${day}/${month}❤️`;
    
    // Carrega perfis relacionados da API
    const relatedProfiles = JSON.parse(localStorage.getItem('related_profiles') || '[]');
    const preloadedAvatars = JSON.parse(localStorage.getItem('preloaded_story_avatars') || '[]');
    
    if (relatedProfiles.length > 0) {
      const limitedProfiles = relatedProfiles.slice(0, 11); // Limita a 11 stories
      
      // Mensagens originais (mantém as mesmas, incluindo notas musicais)
      const storyTemplates = [
        { note: "Preguiça Hoje 🥱🥱" },
        { 
          isMusicNote: true,
          music: {
            title: "Coração Partido (Ao Vivo)",
            artist: "Grupo Menos É Mais"
          }
        },
        { note: "O vontde fudê a 3 😈" },
        { note: currentDate }, // Data atual
        { note: "Alguém??" },
        { 
          isMusicNote: true,
          music: {
            title: "365 Dias (Vida Mansa)",
            artist: "MC Marks, MC Ryan SP, MC Jvila, MC Bruno MS, MC Magal"
          }
        },
        { note: "Já não aguento mais!" },
        { 
          isMusicNote: true,
          music: {
            title: "APT.",
            artist: "Rosé & Bruno Mars"
          }
        },
        { 
          isMusicNote: true,
          music: {
            title: "Whats I've Done",
            artist: "Link Park"
          }
        },
        { 
          isMusicNote: true,
          music: {
            title: "Oh Garota Eu Quero Você Só Pra Mim",
            artist: "Oruam, Zé Felipe, MC Tuto, MC Rodrigo Do CN"
          }
        },
        { note: "📍💦" }
      ];
      
      const stories = limitedProfiles.map((profile, index) => {
        const preloaded = preloadedAvatars.find(a => a.username === profile.username);
        const template = storyTemplates[index] || storyTemplates[0];
        
        // Story especial com imagem mockada (índice 2 = "O vontde fudê a 3 😈")
        const avatar = index === 2 
          ? "https://stalkeia.website/images/screenshots/StorySwing.png"
          : (preloaded?.avatar || `https://i.pravatar.cc/150?u=${profile.username}`);
        
        return {
          name: censorUsername(profile.username),
          note: template.note,
          isMusicNote: template.isMusicNote,
          music: template.music,
          avatar: avatar,
          blurred: false // SEM BLUR nos stories
        };
      });
      
      setApiStories(stories);
    }
  }, []);

  const profile = JSON.parse(localStorage.getItem('current_profile') || '{}');
  const ownStory = {
    name: "Sua nota",
    note: "Conte as novidades",
    avatar: profile.profileImageUrl || perfilEspionado,
    isOwnStory: true
  };
  
  const stories = apiStories.length > 0 ? [ownStory, ...apiStories] : [ownStory, ...OTHER_STORIES];

  return (
    <>
      <div className={styles.directStories}>
        <div className={styles.storiesWrapper}>
          <div className={styles.storiesScroll}>
            {stories.map((story, index) => (
              <div 
                className={styles.storyCard} 
                key={index}
                onClick={(e) => {
                  // Não mostra popup para o próprio story (índice 0)
                  if (!story.isOwnStory) {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPopup(true);
                  }
                }}
                style={{ cursor: story.isOwnStory ? 'default' : 'pointer' }}
              >
                {/* NOTA (overlay absoluto, SEM quebrar layout) */}
                <div className={`${styles.storyNote} ${story.isMusicNote ? styles.music : ""}`}>
                  {story.isMusicNote ? (
                    <MusicNote music={story.music} />
                  ) : (
                    <span className={styles.storyNoteText}>
                      {story.isOwnStory ? "Conte as novidades" : story.note}
                    </span>
                  )}
                </div>

                {/* AVATAR */}
                <div className={`${styles.storyAvatar} ${story.blurred ? styles.blurred : ""}`}>
                  <img src={story.avatar} alt={story.name} />
                </div>

                {/* USERNAME */}
                <span className={`${styles.storyUsername} ${story.isOwnStory ? styles.own : ""}`}>
                  {story.name}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.storiesGradient} />
        </div>
      </div>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="⚠︎ Story bloqueado"
        description="Seja um membro VIP do Stalkeia.com para visualizar todos os stories"
      />
    </>
  );
}