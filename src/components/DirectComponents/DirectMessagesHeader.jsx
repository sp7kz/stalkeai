import { useState } from "react";
import BlockedScrollPopup from "../ChatComponents/BlockedScrollPopup";
import "./DirectMessagesHeader.css";

export default function DirectMessagesHeader() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="direct-messages-header">
        <h2 className="direct-messages-title">Mensagens</h2>
        <span 
          className="direct-messages-requests" 
          id="pedidos-link"
          onClick={() => setShowPopup(true)}
          style={{ cursor: 'pointer' }}
        >
          Pedidos (4)
        </span>
      </div>

      <BlockedScrollPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="⚠︎ Ação bloqueada"
        description="Seja um membro VIP do Stalkeia.com para visualizar pedidos de mensagens"
      />
    </>
  );
}
