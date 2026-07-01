import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BlockedScrollPopup.module.css";
import { preserveParams } from "../../utils/navigation";

export default function BlockedScrollPopup({
  show,
  onClose,
  title = "⚠︎ Ação bloqueada",
  description = "Seja um membro VIP do Stalkeia.com para ter acesso a esta ação"
}) {
  const navigate = useNavigate();

  console.log('BlockedScrollPopup - show:', show);

  useEffect(() => {
    if (show) {
      console.log('Popup está visível!');
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.popup}>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.description}>
          {description}
        </p>

        <button className={styles.button} onClick={() => navigate(preserveParams("/cta"))}>
          Adquirir Acesso VIP
        </button>
      </div>
    </>
  );
}