import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_gallery ${card ? "popup_opened" : ""}`}>
      <div className="popup__gallery-container">
        <button className="popup__closed" type="reset" onClick={onClose} />
        <img
          className="popup__gallery-photo"
          src={card?.link}
          alt={card?.name}
        />
        <h2 className="popup__image-description"> {card?.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
