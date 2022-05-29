import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [formValues, setFormValues] = useState({password: '', email: ''});

    function handleSubmit(e) {
      e.preventDefault();
      onRegister(formValues);
    }
  
    function handleChange(e) {
      const {name, value} = e.target;
      setFormValues((prevState) => ({...prevState, [name]: value}));
    }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="login__title">Регистрация</h2>
      <fieldset className="login__inputs-container">
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
            value={formValues.password || ''}
            type="password"
            placeholder="Пароль"
            required
        />
      </fieldset>
      <button className="login__button" type="submit">Зарегистрироваться</button>
      <Link className="login__redirect-button" to='/sign-in'>Уже зарегистрированы? Войти</Link>
    </form>
  );
}

export default Register;