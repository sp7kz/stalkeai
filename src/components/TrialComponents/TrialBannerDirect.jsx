import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TrialBannerDirect.module.css";
import { preserveParams } from "../../utils/navigation";

function getTimeLeft() {
  const trialExpires = localStorage.getItem("trial_expires");
  if (!trialExpires) return null;

  const diff = parseInt(trialExpires, 10) - Date.now();
  if (diff <= 0) return null;

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function TrialBannerDirect({ position = "bottom" }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [isVisible, setIsVisible] = useState(() => {
    const expires = localStorage.getItem("trial_expires");
    return !!expires && Date.now() < parseInt(expires, 10);
  });

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      const updatedTime = getTimeLeft();

      if (!updatedTime) {
        setIsVisible(false);
        setTimeLeft(null);
        clearInterval(interval);
        navigate(preserveParams("/cta"), { replace: true });
        return;
      }

      setTimeLeft(updatedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, navigate]);

  if (!isVisible || !timeLeft) return null;

  return (
    <div className={styles.trialBanner}>
      <div className={styles.bannerContent}>
        <div className={styles.bannerInfo}>
          <p className={styles.timer}>
            ⚡ Prévia disponível por
            <span className={styles.timerWrapper}>
              <span>{timeLeft}</span>
              <svg
                className={styles.timerIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </p>

          <p className={styles.bannerText}>
            Você ganhou 10 minutos para testar gratuitamente nossa ferramenta,
            mas para liberar todas as funcionalidades e ter acesso permanente é
            necessário ser um membro VIP.
          </p>
        </div>

        <button
          type="button"
          className={styles.vipButton}
          onClick={() => navigate(preserveParams("/cta"))}
        >
          Virar VIP
        </button>
      </div>
    </div>
  );
}
