import { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <div className="authorized-form">
        <p className="authorized-form__user-email">{props.userEmail}</p>
        <Link to="/sign-in" className="authorized-form__header-button" onClick={props.onLogout}>Выйти</Link>
      </div>
      <section className="profile">
        <div className="profile__avatar-content">
          <button type="button" className="profile__avatar-edit-button" onClick={props.onEditAvatar}></button>
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__status">{currentUser.about}</p>
          <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="cards">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            _id={card._id}
            name={card.name}
            link={card.link}
            owner={card.owner}
            likes={card.likes}
            onCardClick={props.onCardImage}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />))}
      </section>
    </main>
  );
}

export default Main;