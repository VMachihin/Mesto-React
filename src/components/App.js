import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [onClose, setOnClose] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

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

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <ImagePopup card={selectedCard} onClose={onClose} closeAllPopups={closeAllPopups} />

      <PopupWithForm
        title={'Редактировать профиль'}
        buttonText={'Сохранить'}
        name={'editUser'}
        isOpen={isEditProfilePopupOpen}
        closeAllPopups={closeAllPopups}
        onClose={onClose}
      >
        <input
          type="text"
          name="name"
          id="name"
          className="popup__input popup__input_edit"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__text-error name-error"></span>
        <input
          type="text"
          name="about"
          id="aboutMe"
          className="popup__input popup__input_edit"
          placeholder="Профессия"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__text-error aboutMe-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title={'Новое место'}
        buttonText={'Создать'}
        name={'addCards'}
        isOpen={isAddPlacePopupOpen}
        closeAllPopups={closeAllPopups}
        onClose={onClose}
      >
        <input
          type="text"
          name="place"
          id="place"
          className="popup__input popup__input_addCard"
          placeholder="Название"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__text-error place-error"></span>
        <input
          type="url"
          name="linkImg"
          id="linkImg"
          className="popup__input popup__input_addCard"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__text-error linkImg-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title={'Обновить аватар'}
        buttonText={'Сохранить'}
        name={'changeAvatar'}
        isOpen={isEditAvatarPopupOpen}
        closeAllPopups={closeAllPopups}
        onClose={onClose}
      >
        <input
          type="url"
          name="linkAvatar"
          id="linkAvatar"
          className="popup__input popup__input_linkAvatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__text-error linkAvatar-error"></span>
      </PopupWithForm>
    </div>
  );
}

export default App;
