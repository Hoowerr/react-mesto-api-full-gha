import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: name, link: link });
  }

  return (
    <PopupWithForm
      name="popup_add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input popup__add-name popup__input"
        type="text"
        placeholder="Название"
        id="AddNameInputId"
        name="name"
        minLength="2"
        maxLength="30"
        required=""
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__input-error AddNameInputId-error" />
      <input
        className="popup__form-input popup__add-url popup__input"
        type="url"
        placeholder="Ссылка на картинку"
        id="inputImgUrl"
        name="link"
        required=""
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error inputImgUrl-error" />
    </PopupWithForm>
  );
}
export default AddPlacePopup;
