import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [onClose, setOnClose] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    setOnClose(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    setOnClose(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    setOnClose(true);
  }
  function closeAllPopups() {
    setOnClose(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }
  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
    setOnClose(true);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.error(err));
  }
  function handleCardDelete(cardId) {
    api
      .deleteCardApi(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => (c._id === cardId ? null : state)));
      })
      .then(() => closeAllPopups())
      .catch((err) => console.error(err));
  }
  function handleUpdateUser(updateUserData) {
    api
      .editingProfile(updateUserData)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(userNewCard) {
    api
      .addNewCard(userNewCard)
      .then((newCard) => setCards([...cards, newCard]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <ImagePopup card={selectedCard} onClose={onClose} closeAllPopups={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={onClose}
          closeAllPopups={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={onClose}
          closeAllPopups={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={onClose}
          closeAllPopups={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
