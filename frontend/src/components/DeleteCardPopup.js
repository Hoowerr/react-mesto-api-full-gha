import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, isDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    isDeleteCard();
  }

  return (
    <PopupWithForm
      name="popup_gallery-delete"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={<></>}
    />
  );
}

export default DeleteCardPopup;
