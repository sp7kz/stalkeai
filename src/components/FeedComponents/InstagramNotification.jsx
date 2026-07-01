import { useState, useEffect } from 'react';
import styles from './InstagramNotification.module.css';

export default function InstagramNotification() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostra a notificação após 5 segundos
    const showTimer = setTimeout(() => {
      setShow(true);
      // Pequeno delay para a animação funcionar
      setTimeout(() => setIsVisible(true), 50);
    }, 5000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (show) {
      // Esconde a notificação após 5 segundos de exibição
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        // Remove do DOM após a animação
        setTimeout(() => setShow(false), 400);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }
  }, [show]);

  const handleClick = () => {
    setIsVisible(false);
    setTimeout(() => setShow(false), 400);
  };

  if (!show) return null;

  // Pega o username do localStorage
  const currentUsername = localStorage.getItem('current_username') || 'você';

  return (
    <div 
      className={`${styles.notification} ${isVisible ? styles.visible : ''}`}
      onClick={handleClick}
    >
      <div className={styles.iconWrapper}>
        <img 
          alt="Instagram" 
          className={styles.icon}
          src="/images/logos/Logo-notificcai.svg.png"
        />
      </div>
      <div className={styles.content}>
        <span className={styles.time}>Agora</span>
        <p className={styles.title}>Instagram</p>
        <p className={styles.message}>
          Fer***** enviou uma mensagem: "{currentUsername} adivinha o que vc esqueceu aqui? kkkkk"
        </p>
      </div>
    </div>
  );
}
