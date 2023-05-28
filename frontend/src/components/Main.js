import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  onSignout,
  email,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header
        buttonText="Выйти"
        buttonLink="/sign-in"
        onSignout={onSignout}
        email={email}
      />
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <button
              className="profile__avatar-button"
              type="button"
              id="profile__avatar-btn"
              onClick={onEditAvatar}
            >
              <img
                src={currentUser.avatar}
                alt="аватар"
                className="profile__avatar"
              />
            </button>
            <div className="profile__info">
              <div className="profile__main">
                <h1 className="profile__title">{currentUser.name}</h1>
                <p className="profile__subtitle">{currentUser.about}</p>
              </div>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              />
            </div>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={onAddPlace}
          />
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}
export default Main;
