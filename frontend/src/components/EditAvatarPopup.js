import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="popup_add-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input popup__add-url popup__input"
        type="url"
        placeholder="Ссылка на картинку"
        id="inputAvatarUrl"
        name="link"
        required=""
        ref={avatarRef}
      />
      <span className="popup__input-error inputAvatarUrl-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
