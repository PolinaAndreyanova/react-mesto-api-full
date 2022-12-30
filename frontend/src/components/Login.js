import { Link, Redirect } from "react-router-dom";
import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onLogin({password, email});
  }

  if (props.isLoggedIn) return <Redirect to="/" />;

  return (
    <div className="unauthorized-form">
      <Link to="/sign-up" className="unauthorized-form__header-button">Регистрация</Link>
      <h2 className="unauthorized-form__title">Вход</h2>
      <form method="get" name="unauthorized-formForm" className="unauthorized-form__form" onSubmit={handleSubmit} noValidate>
        <input
          required
          id="email-input"
          type="email"
          className="unauthorized-form__input unauthorized-form__input_type_email"
          name="email"
          minLength="2"
          maxLength="40"
          placeholder="Email"
          onChange={handleChangeEmail}
        />
        <input
          required
          id="password-input"
          type="password"
          className="unauthorized-form__input unauthorized-form__input_type_password"
          name="password"
          minLength="2"
          maxLength="40"
          placeholder="Пароль"
          onChange={handleChangePassword}
        />
        <button type="submit" className="unauthorized-form__submit-button">{props.loading ? 'Выполняется вход...' : 'Войти'}</button>
      </form>
    </div>
  );
}

export default Login;