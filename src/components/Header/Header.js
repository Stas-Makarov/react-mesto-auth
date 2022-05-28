import React from 'react';
import { Route, Link } from 'react-router-dom';
import Logo from '../../images/лого.svg';

function Header({ signOut, email }) {
    return (
        <header className="header">
            <img className="header__logo" src={Logo} alt="логотип"/>
                      
            <Route path="/signup">
                <Link className="header__login" to="/signin" >
                    Войти
                </Link>
            </Route>
      
            <Route path="/signin">
                <Link className="header__login" to="/signup" >
                    Регистрация
                </Link>
            </Route>

            <Route exact path="/">
                <div className="header__logout-container">
                    <p className="header__logout-text">{email}</p>
                    <button className="header__logout-button" type="button" onClick={signOut}>
                        Выйти
                    </button>
                </div>        
            </Route>
        </header>
    );    
}

export default Header;