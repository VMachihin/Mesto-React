function Card({ cards, onCardClick }) {
  return cards.map((card) => {
    return (
      <li key={card._id} className="gallery__item">
        <article className="card">
          <img
            src={card.link}
            alt="#"
            className="card__img"
            onClick={() => onCardClick(card.link)}
          />
          <div className="card__descr">
            <h2 className="card__title">{card.name}</h2>
            <div className="card__wrp-like">
              <button type="button" className="card__btn card__btn_like"></button>
              <span className="card__counter-likes">{card.likes.length}</span>
            </div>
          </div>
          <button type="button" className="card__btn card__btn_basket"></button>
        </article>
      </li>
    );
  });
}

export default Card;
