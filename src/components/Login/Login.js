import React from 'react';
import { useState } from 'react';

function Login({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAuth(password, email);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="login__title">Вход</h2>
      <div className="login__inputs-container">
        <input
            className="login__input"
            type="email"
            placeholder="Email"
            value={email || ""}
            onChange={handleChangeEmail}
        />
        <input
            className="login__input"
            type="password"
            placeholder="Пароль"
            value={password || ""}
            onChange={handleChangePassword}
        />
      </div>
      <button className="login__button" type="submit">
        Войти
      </button>
    </form>
  );
}

export default Login;