function ImagePopup(props) {
  return (
    <div className={`popup popup_type_big-image${props.card ? ' popup_opened' : ''}`}>
      <div className="popup__content popup__content_for-image">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        {props.card ? 
          <>
            <img className="popup__image" src={props.card.link} alt={props.card.name} />
            <p className="popup__subtitle">{props.card.name}</p>
          </> : null}
        
      </div>
    </div>
  )
}

export default ImagePopup;