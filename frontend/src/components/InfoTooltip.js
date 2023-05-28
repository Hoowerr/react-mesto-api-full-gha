import successImage from "../images/icon-success.svg";
import failImage from "../images/icon-fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <section
      className={`popup popup_type_success ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div className="popup__container popup__container-open">
        <button className="popup__closed" type="reset" onClick={onClose} />
        <img
          className="popup__image-open"
          src={isSuccess ? successImage : failImage}
          alt="#"
        />
        <h2 className="popup__title popup__title-open">{message}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
//
