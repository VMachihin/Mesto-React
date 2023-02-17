function PopupWithForm({ title, name, children, isOpen, closeAllPopups, onClose }) {
  return (
    <div className={`popup popup_${name} ${isOpen && onClose ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_${name}`}>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`popup-${name}`} noValidate>
          {children}
        </form>
        <button type="button" className="popup__close" onClick={closeAllPopups}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
