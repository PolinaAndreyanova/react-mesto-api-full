import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar(avatarRef.current.value, avatarRef);
  } 

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      formName='avatar'
      btnText={props.loading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        required
        id="avatar-input"
        type="url"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
      />
      <p className="popup__error avatar-input-error"></p>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;