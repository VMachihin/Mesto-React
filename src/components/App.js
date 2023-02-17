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
  const [selectedCard, setSelectedCard] = React.useState('');

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
    setSelectedCard(false);
  }
  function handleCardClick(linkImg) {
    setSelectedCard(linkImg);
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
        name={'editUser'}
        children={
          <>
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
            <button className="popup__btn popup__btn_save" type="submit">
              Сохранить
            </button>
          </>
        }
        isOpen={isEditProfilePopupOpen}
        closeAllPopups={closeAllPopups}
        onClose={onClose}
      />
      <PopupWithForm
        title={'Новое место'}
        name={'addCards'}
        children={
          <>
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
            <button className="popup__btn popup__btn_create" type="submit">
              Создать
            </button>
          </>
        }
        isOpen={isAddPlacePopupOpen}
        closeAllPopups={closeAllPopups}
        onClose={onClose}
      />
      <PopupWithForm
        title={'Обновить аватар'}
        name={'changeAvatar'}
        children={
          <>
            <input
              type="url"
              name="linkAvatar"
              id="linkAvatar"
              className="popup__input popup__input_linkAvatar"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__text-error linkAvatar-error"></span>
            <button className="popup__btn" type="submit">
              Сохранить
            </button>
          </>
        }
        isOpen={isEditAvatarPopupOpen}
        closeAllPopups={closeAllPopups}
        onClose={onClose}
      />
    </div>
  );
}

export default App;
