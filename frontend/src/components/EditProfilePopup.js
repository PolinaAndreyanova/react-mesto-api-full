import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      formName='info'
      btnText={props.loading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        required
        id="name-input"
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        value={name || ''}
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        onChange={handleChangeName}
      />
      <p className="popup__error name-input-error"></p>
      <input
        required
        id="status-input"
        type="text"
        className="popup__input popup__input_type_status"
        name="status"
        value={description || ''}
        minLength="2"
        maxLength="200"
        placeholder="Статус"
        onChange={handleChangeDescription}
      />
      <p className="popup__error status-input-error"></p>
    </PopupWithForm>
  );
}

export default EditProfilePopup;