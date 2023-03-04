import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, closeAllPopups, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
      name={'editUser'}
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="name"
        className="popup__input popup__input_edit"
        placeholder="Имя"
        value={name || ''}
        required
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
      />
      <span className="popup__text-error name-error"></span>
      <input
        type="text"
        name="about"
        id="aboutMe"
        className="popup__input popup__input_edit"
        placeholder="Профессия"
        value={description || ''}
        required
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
      />
      <span className="popup__text-error aboutMe-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
