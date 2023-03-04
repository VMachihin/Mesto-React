import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, closeAllPopups, onAddPlace }) {
  const [place, setPlace] = React.useState('');
  const [linkImg, setLinkImg] = React.useState('');

  function handleAddPlace(e) {
    setPlace(e.target.value);
  }
  function handleAddLinkImg(e) {
    setLinkImg(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      place,
      linkImg,
    });
  }
  return (
    <PopupWithForm
      title={'Новое место'}
      buttonText={'Создать'}
      name={'addCards'}
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="place"
        id="place"
        className="popup__input popup__input_addCard"
        placeholder="Название"
        value={place || ''}
        onChange={handleAddPlace}
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
        value={linkImg || ''}
        onChange={handleAddLinkImg}
        required
      />
      <span className="popup__text-error linkImg-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
