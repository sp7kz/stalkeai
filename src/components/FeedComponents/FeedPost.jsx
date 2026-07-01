import { useState } from "react";
import styles from "./FeedPost.module.css";
import BlockedScrollPopup from "../ChatComponents/BlockedScrollPopup";

import likeIcon from "../../assets/feed/coracao.svg";
import commentIcon from "../../assets/feed/comentario.svg";
import sendIcon from "../../assets/feed/enviar.svg";
import saveIcon from "../../assets/feed/salvar.svg";

function formatNumber(n) {
  if (n >= 1000000) {
    const val = (n / 1000000).toFixed(1).replace(".", ",");
    return `${val} mi`;
  }
  if (n >= 1000) {
    const val = (n / 1000).toFixed(n >= 10000 ? 1 : 0).replace(".", ",");
    return `${val} mil`;
  }
  return n.toLocaleString("pt-BR");
}

export default function FeedPost({ username, avatar, likes, comments, time, blurLevel = 0, location, description, postImage, imageBlur, avatarBlur }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleBlocked = () => setShowPopup(true);

  const handleLikeClick = () => {
    if (showRestricted) {
      handleBlocked();
      return;
    }
    
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  // REMOVIDO: blur baseado em blurLevel (que aumentava com o índice)
  // const blur = Math.max(0, (blurLevel - 2) * 1.5);
  // const postStyle = blur > 0 ? { filter: `blur(${blur}px)` } : undefined;

  const finalAvatarBlur = avatarBlur !== undefined ? avatarBlur : 5;
  const avatarStyle = finalAvatarBlur > 0 ? { filter: `blur(${finalAvatarBlur}px)` } : undefined;
  
  const finalImageBlur = imageBlur !== undefined ? imageBlur : 30;
  const showRestricted = finalImageBlur > 0; // Só mostra "Conteúdo restrito" se tiver blur

  return (
    <>
      <article className={styles.feedPost}>

        {/* HEADER */}
        <header className={styles.postHeader}>
          <div className={styles.postUser}>
            <div className={styles.postAvatarWrapper}>
              <img src={avatar} alt="" className={styles.postAvatar} style={avatarStyle} />
            </div>
            <div className={styles.postUserInfo}>
              <span className={styles.postUsername}>{username}</span>
              {location && <span className={styles.postLocation}>{location}</span>}
            </div>
          </div>
          <button className={styles.postMenu} onClick={handleBlocked}>•••</button>
        </header>

        {/* IMAGEM */}
        <div className={styles.postImageContainer} onClick={showRestricted ? handleBlocked : undefined}>
          <img
            src={postImage || avatar}
            alt=""
            className={styles.postImage}
            style={
              showRestricted
                ? {
                    filter: `blur(${finalImageBlur}px)`,
                    transform: "scale(1.15)",
                  }
                : undefined
            }
          />
          {showRestricted && (
            <div className={styles.postRestricted}>
              <svg
                className={styles.restrictedIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                  d="M16.5 10.5V8a4.5 4.5 0 10-9 0v2.5M9 10.5h6a3 3 0 013 3v4.5a3 3 0 01-3 3H9a3 3 0 01-3-3v-4.5a3 3 0 013-3z"
                />
              </svg>
              <p className={styles.restrictedTitle}>Conteúdo restrito</p>
            </div>
          )}
        </div>

        {/* AÇÕES */}
        <div className={styles.postActions}>
          <div className={styles.postActionsLeft}>
            <button 
              className={styles.actionBtn} 
              onClick={handleLikeClick}
              style={{ color: isLiked ? '#FF3040' : '#F5F5F5' }}
            >
              {isLiked ? (
                <svg aria-label="Descurtir" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24">
                  <title>Descurtir</title>
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              ) : (
                <svg aria-label="Curtir" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <title>Curtir</title>
                  <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                </svg>
              )}
            </button>
            <button className={styles.actionBtn} onClick={showRestricted ? handleBlocked : undefined}>
              <img src={commentIcon} alt="Comentar" />
            </button>
            <button className={styles.actionBtn} onClick={showRestricted ? handleBlocked : undefined}>
              <img src={sendIcon} alt="Enviar" />
            </button>
          </div>
          <button className={styles.actionBtn} onClick={showRestricted ? handleBlocked : undefined}>
            <img src={saveIcon} alt="Salvar" />
          </button>
        </div>

        {/* CURTIDAS */}
        <div className={styles.postLikes} onClick={showRestricted ? handleBlocked : undefined}>
          {formatNumber(likeCount)} curtidas
        </div>

        {/* DESCRIÇÃO */}
        {description && (
          <div className={styles.postDescription}>
            <span className={styles.postDescriptionUser}>{username}</span>
            <span className={styles.postDescriptionText}>{description}</span>
          </div>
        )}

        {/* COMENTÁRIOS */}
        {comments > 0 && (
          <div className={styles.postCommentsLink} onClick={showRestricted ? handleBlocked : undefined}>
            Ver todos os {formatNumber(comments)} comentários
          </div>
        )}

        {/* DATA */}
        <div className={styles.postTime}>{time}</div>

      </article>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="🔒 Conteúdo bloqueado"
        description="Seja um membro VIP do Stalkea.ai para interagir com as publicações"
      />
    </>
  );
}
