import React, { useEffect, useState, useCallback } from "react";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [onDeleteCard, setOnDeleteCard] = useState(false);
  const [cardDeleteId, setCardDeleteId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState("");
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const [email, setEmail] = useState("");

  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token && !loggedIn) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
            setEmail(res.email);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userRes, cardsRes]) => {
          setCurrentUser(userRes);
          setCards(cardsRes);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, tokenCheck]);

  function handleLogin(userData) {
    auth
      .login(userData.email, userData.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          setEmail(userData.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  function handleRegister(regUserData) {
    auth
      .register(regUserData.email, regUserData.password)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsRegistrationSuccess(true);
        handleSignup("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  function handleSignup(message) {
    setIsInfoTooltipMessage(message);
    setIsInfoTooltipOpen(true);
  }

  function handleSignout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  }

  function handleCardLike(card) {
    // console.log(card.likes)
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  const handleDeleteCardPopup = () => {
    api
      .removeCard(cardDeleteId._id)
      .then(() => {
        setCards((state) =>
          state.filter((element) => element._id !== cardDeleteId._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (_id) => {
    setCardDeleteId(_id);
    deleteCardPopup();
  };

  const deleteCardPopup = () => {
    setOnDeleteCard(true);
  };

  function handleUpdateUser(userData) {
    api
      .editUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    api
      .setAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setOnDeleteCard(false);
    setIsInfoTooltipOpen(false);
  }

  return (
    <div>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/sign-in"
              element={
                <Login onLogin={handleLogin} title="Вход" buttonText="Войти" />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  onRegister={handleRegister}
                  title="Регистрация"
                  buttonText="Зарегистрироваться"
                />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  isDeleteCard={deleteCardPopup}
                  cards={cards}
                  loggedIn={loggedIn}
                  email={email}
                  onSignout={handleSignout}
                />
              }
            />
           <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <DeleteCardPopup
            isOpen={onDeleteCard}
            onClose={closeAllPopups}
            isDeleteCard={handleDeleteCardPopup}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            message={isInfoTooltipMessage}
            isSuccess={isRegistrationSuccess}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
      <template id="idElements"></template>
    </div>
  );
}

export default App;
