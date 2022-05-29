import React from 'react';
import { useState } from 'react';

function Login({ onLogin }) {
    const [formValues, setFormValues] = useState({password: '', email: ''});
  
    function handleSubmit(e) {
      e.preventDefault();
      onLogin(formValues);
    }
  
    function handleChange(e) {
      const {name, value} = e.target;
      setFormValues((prevState) => ({...prevState, [name]: value}));
    }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="login__title">Вход</h2>
      <div className="login__inputs-container">
        <input
            className="login__input"
            onChange={handleChange}
            value={formValues.email || ''}          
            type="email"
            placeholder="Email"
            required
        />
        <input
            className="login__input"
            onChange={handleChange}
            type="password"
            value={formValues.password || ''}
            placeholder="Пароль"
            required
        />
      </div>
      <button className="login__button" type="submit">
        Войти
      </button>
    </form>
  );
}

export default Login;