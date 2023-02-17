import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo().then((userData) => {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
    });
  }, [userName, userDescription, userAvatar]);

  React.useEffect(() => {
    api.getCards().then((cardsData) => setCards(cardsData));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-wrp" onClick={onEditAvatar}>
          <img src={userAvatar} alt="аватар профиля" className="profile__img" />
        </div>
        <div className="info">
          <div className="info__name-wrapper">
            <h1 className="info__title">{userName}</h1>
            <button type="button" className="info__editing-btn" onClick={onEditProfile}></button>
          </div>
          <p className="info__subtitle">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-btn" onClick={onAddPlace}></button>
      </section>

      <section className="gallery" aria-label="Блок с карточками красивых мест">
        <ul className="gallery__list">
          <Card cards={cards} onCardClick={onCardClick} />
        </ul>
      </section>
    </main>
  );
}

export default Main;
