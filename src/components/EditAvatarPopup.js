import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, closeAllPopups, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [avatar, setAvatar] = React.useState(currentUser.avatar);

  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  return (
    <PopupWithForm
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
      name={'changeAvatar'}
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="linkAvatar"
        id="linkAvatar"
        className="popup__input popup__input_linkAvatar"
        placeholder="Ссылка на картинку"
        required
        ref={inputRef}
      />
      <span className="popup__text-error linkAvatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
