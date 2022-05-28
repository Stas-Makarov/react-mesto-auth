import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import EditAvatartPopup from '../EditAvatarPopup/EditAvatarPopup.js';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js';
import AddCardPopup from '../AddCardPopup/AddCardPopup.js';
import ImagePopup from '../ImagePopup/imagePopup.js';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup.js';
import CurrentUserContext from './../../contexts/CurrentUserContext.js';
import { api } from '../../utils/Api.js';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''
  });
  const [cards, setCards] = useState([]);
  const [isRenderLoading, setRenderLoading] = useState(false);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  // const [message, setMassage] = useState({
  //   text: "",
  //   imgPath: "",
  // });
  // const [email, setEmail] = useState("");


  useEffect(() => {
    Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     api
  //       .getUserInfoFromApi()
  //       .then((user) => {
  //         setCurrentUser(user);
  //       })
  //       .catch((err) => `Ошибка получения данных пользователя : ${err}`);
  //   }
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     api
  //       .getCardsFromApi()
  //       .then((cards) => {
  //         setCards(cards);
  //       })
  //       .catch((err) => `Ошибка получения карточек: ${err}`);
  //   }
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  
  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoading(false));
  }

  function handleCardDeleteSubmit(card) {
    setRenderLoading(true);

    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoading(false));
  }

  function handleUpdateUser(userData) {
    setRenderLoading(true);

    api.updateUserInfo(userData)
      .then(userData => {
        setCurrentUser(userData);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoading(false));
  }

  function handleUpdateAvatar(data) {
    setRenderLoading(true);

    api.editAvatar(data)
      .then(data => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoading(false));
  }

  function handleAddCardSubmit(cardData) {
    setRenderLoading(true);
    
    api.addNewCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoading(false));
  }
 
  function handleEditAvatarClick() { 
    setIsEditAvatarPopupOpen(true); 
  } 

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true); 
  } 

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardImageClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteCardClick(card) {
    setConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  function closePopups() {   
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
}

// const handleRegister = (password, email) => {
//   auth
//     .register(password, email)
//     .then(() => {
//       history.push("/signin");
//       setMassage({
//         text: "Вы успешно зарегистрировались!",
//         imgPath: successImg,
//       });
//     })
//     .catch((err) => {
//       setMassage({
//         text: "Что-то пошло не так! Попробуйте ещё раз.",
//         imgPath: unSuccessImg,
//       });
//       return err == 400
//         ? console.log("Ошибка 400 - некорректно заполнено одно из полей")
//         : console.log(`Ошибка ${err}`);
//     })
//     .finally(() => setIsInfoTooltipOpen(true));
// };

// const handleAutorize = (password, email) => {
//   auth
//     .authorize(password, email)
//     .then((data) => {
//       auth.getToken(data.token).then((res) => {
//         setIsLoggedIn(true);
//         history.push("/");
//       });
//     })
//     .catch((err) => {
//       setMassage({
//         text: "Что-то пошло не так! Попробуйте ещё раз.",
//         imgPath: unSuccessImg,
//       });
//       setIsInfoTooltipOpen(true);
//       switch (err) {
//         case 400:
//           console.log("Ошибка 400 - не передано одно из полей");
//           break;
//         case 401:
//           console.log("Ошибка 401 - пользователь с email не найден ");
//           break;
//         default:
//           console.log(`Ошибка ${err}`);
//       }
//     });
// };

// const checkToken = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     auth
//       .getToken(token)
//       .then((res) => {
//         setIsLoggedIn(true);
//         history.push("/");
//         setEmail(res.data.email);
//       })
//       .catch((err) => console.log(err));
//   }
// };

// const signOut = () => {
//   localStorage.removeItem("token");
//   setIsLoggedIn(false);
//   history.push("/signup");
// };


  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Switch>
          <Rout path="/sign-in">
            <Login />
          </Rout>
          <Rout path="/sign-up">
            <Register />
          </Rout>
          <ProtectedRout  exact path="/" loggedIn={loggedIn}>
            <Main 
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddCardClick}
              onCardClick={handleCardImageClick}
              onDeleteClick={handleDeleteCardClick}
              cards={cards}
              handleCardLike={handleCardLike}
            />
          </ProtectedRout>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        
        <Footer />
        <EditAvatartPopup 
              isOpen={isEditAvatarPopupOpen} 
              onClose={closePopups} 
              onUpdateAvatar={handleUpdateAvatar}
              isRenderLoading={isRenderLoading}
        /> 
        <EditProfilePopup 
              isOpen={isEditProfilePopupOpen} 
              onClose={closePopups}
              onUpdateUser={handleUpdateUser}
              isRenderLoading={isRenderLoading}
        />
        <AddCardPopup 
              isOpen={isAddCardPopupOpen} 
              onClose={closePopups}
              onAddCard={handleAddCardSubmit}
              isRenderLoading={isRenderLoading}
        />
        <ImagePopup
              isOpen={isImagePopupOpen} 
              card={selectedCard}
              onClose={closePopups}
        />
        <ConfirmPopup
              isOpen={isConfirmPopupOpen}
              card={deletedCard}
              onClose={closePopups}
              onDeleteCard={handleCardDeleteSubmit}
              isRenderLoading={isRenderLoading}
        />
      </CurrentUserContext.Provider>
    </div>    
  );
}

export default App;
