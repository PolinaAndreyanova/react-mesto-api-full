import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const titleRef = useRef();
  const linkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddCard(titleRef.current.value, linkRef.current.value, titleRef, linkRef);
  } 

  return (
    <PopupWithForm
      name='add-profile'
      title='Новое место'
      formName='place'
      btnText={props.loading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        required
        id="title-input"
        type="text"
        className="popup__input popup__input_type_title"
        name="title"
        placeholder="Название"
        minLength="2"
        maxLength="30" 
        ref={titleRef}
      />
      <p className="popup__error title-input-error"></p>
      <input
        required
        id="link-input"
        type="url"
        className="popup__input popup__input_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        ref={linkRef} 
      />
      <p className="popup__error link-input-error"></p>
    </PopupWithForm>
  );
}

export default AddPlacePopup;