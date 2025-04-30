import React from "react";
import "../css/confirmDialog.css";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn cancel" onClick={onCancel}>Annuler</button>
          <button className="btn confirm" onClick={onConfirm}>Confirmer</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
