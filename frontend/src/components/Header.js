import React from "react";
import headerLogo from "../images/logo_header.svg";
import { Link } from "react-router-dom";

function Header({ buttonText, buttonLink, email, onSignout }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип" className="header__logo" />
      <div className="header__container">
        <span className="header__email">{email}</span>
        <Link
          to={buttonLink}
          onClick={onSignout}
          className="header__button"
          href="#"
        >
          {buttonText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
