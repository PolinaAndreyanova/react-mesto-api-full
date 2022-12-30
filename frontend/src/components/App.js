import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import api from '../utils/api';
import * as auth from '../utils/auth';

import CurrentUserContext from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';

import Login from './Login';
import Register from './Register';
import DeleteCardPopup from './DeleteCardPopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);

  const [isRegistrationOk, setRegistrationOk] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const location = useLocation();

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = (newUserData) => {
    setLoading(true);
    api.editProfile(newUserData.name, newUserData.about)
      .then((userData) => {
        setCurrentUser(userData);
        setEditProfilePopupOpen(false);
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => setLoading(false));
  };

  const handleUpdateAvatar = (newAvatarData, avatarRef) => {
    setLoading(true);
    api.updateAvatar(newAvatarData)
      .then((userData) => {
        setCurrentUser(userData);
        setEditAvatarPopupOpen(false);
        avatarRef.current.value = '';
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => setLoading(false));
  };

  const handleAddCard = (cardName, cardLink, cardTitleRef, cardLinkRef) => {
    setLoading(true);
    api.addNewCard(cardName, cardLink)
      .then((cardData) => {
        setCards([cardData, ...cards]);
        setAddPlacePopupOpen(false);
        cardTitleRef.current.value = '';
        cardLinkRef.current.value = '';
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => setLoading(false));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    (!isLiked) ?
      api.likeCard(card._id)
        .then((newCard) => {
          setCards(cards.map(c => c._id === newCard._id ? newCard : c))
        })
        .catch(err => console.log(`Ошибка: ${err}`)) :

      api.cancelLikeCard(card._id)
        .then((newCard) => {
          setCards(cards.map(c => c._id === newCard._id ? newCard : c))
        })
        .catch(err => console.log(`Ошибка: ${err}`));
  };

  const handleCardDeleteClick = (card) => {
    setSelectedDeleteCard(card);
    setDeleteCardPopupOpen(true);
  }

  const handleCardDelete = (card) => {
    setLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id))
        setDeleteCardPopupOpen(false);
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => setLoading(false));
  };

  const handleAuthenticate = (data) => {
    localStorage.setItem('jwt', data.jwt)
    setLoggedIn(true);
  }

  const handleLogin = ({ password, email }) => {
    setLoading(true);
    auth.authorize({ password, email })
      .then((data) => {
        if (data.jwt) {
          handleAuthenticate(data);
          setUserEmail(email);
        }
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => setLoading(false));
  };

  const handleRegister = ({ password, email }) => {
    setLoading(true);
    auth.register({ password, email })
      .then((data) => {
        if (data) {
          setRegistrationOk(true);
        }
      })
      .catch(() => {
        setRegistrationOk(false);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  };

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setUserEmail(data.email);
          }
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (location.path !== '/sign-up') {
      setRegistrationOk(false);
    }
  }, [location]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>

        <Header />

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
            onEditProfile={() => setEditProfilePopupOpen(true)}
            onAddPlace={() => setAddPlacePopupOpen(true)}
            onEditAvatar={() => setEditAvatarPopupOpen(true)}
            onCardImage={(card) => handleCardClick(card)}
            onLogout={handleLogout}
            userEmail={userEmail}
          />

          <Route path="/sign-up">
            <Register
              isLoggedIn={loggedIn}
              onRegister={handleRegister}
              success={isRegistrationOk}
              isPopupOpen={isInfoTooltipPopupOpen}
              onClosePopup={() => setInfoTooltipPopupOpen(false)}
              loading={isLoading}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              isLoggedIn={loggedIn}
              onLogin={handleLogin}
              loading={isLoading}
            />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={() => setEditProfilePopupOpen(false)}
          onUpdateUser={handleUpdateUser}
          loading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={() => setAddPlacePopupOpen(false)}
          onAddCard={handleAddCard}
          loading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={() => setEditAvatarPopupOpen(false)}
          onUpdateAvatar={handleUpdateAvatar}
          loading={isLoading}
        />

        <DeleteCardPopup
          card={selectedDeleteCard}
          isOpen={isDeleteCardPopupOpen}
          onClose={() => setDeleteCardPopupOpen(false)}
          onDeleteCard={handleCardDelete}
          loading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
