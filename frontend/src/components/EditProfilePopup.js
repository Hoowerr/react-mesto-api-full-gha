import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input popup__input popup__input_edit_name"
        type="text"
        placeholder="Имя"
        id="Name"
        name="name"
        minLength="2"
        maxLength="40"
        required=""
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="popup__input-error NameInputId-error" />
      <input
        className="popup__form-input popup__input popup__input_edit_job"
        type="text"
        placeholder="Деятельность"
        id="JobInputId"
        name="description"
        minLength="2"
        maxLength="200"
        required=""
        value={about || ""}
        onChange={handleChangeAbout}
      />
      <span className="popup__input-error JobInputId-error" />
    </PopupWithForm>
  );
}
export default EditProfilePopup;
