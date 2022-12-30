function InfoTooltip(props) {
  return(
    <div className={`popup popup_type_tooltip${props.isOpen ? ' popup_opened' : ''}`} >
      <div className="popup__content">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <div className={`popup__icon popup__icon_type_${props.success ? 'success' : 'fail'}`}></div>
        <h2 className="popup__message">{props.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;