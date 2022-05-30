import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Logo from '../../images/лого.svg';

function Header({ onSignOut, email }) {
    return (
        <header className="header">
            <img className="header__logo" src={Logo} alt="логотип"/>
            <Switch>
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
                        <button className="header__logout-button" type="button" onClick={onSignOut}>
                            Выйти
                        </button>
                    </div>        
                </Route>
            </Switch>
        </header>
    );    
}

export default Header;