import React from "react";

function ConfirmDeleteModal({ onConfirm, onCancel, text }) {
  return (
    <div className="modal-container">
      <div className="modal">
        <p>Вы уверены, что хотите удалить задачу '{text}'?</p>
        <div className="btns">
          <button onClick={onConfirm}>Да</button>
          <button onClick={onCancel}>Нет</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
