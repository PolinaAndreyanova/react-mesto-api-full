import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm
      name='delete-card'
      title='Вы уверены?'
      formName='deleteCard'
      btnText={props.loading ? 'Удаление...' : 'Да'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;