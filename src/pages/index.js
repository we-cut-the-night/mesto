// Импорт классов и переменных
import './index.css'
import Api from '../components/Api.js'
import UserInfo from '../components/UserInfo.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupDeleteCard from '../components/PopupDeleteCard.js'
import FormValidator from '../components/FormValidator.js'
import {validationConfig} from '../utils/constants.js'


// Кнопки открытия форм
const editButton = document.querySelector('.profile__edit')
const addNewPlaceButton = document.querySelector('.profile__button')
const avatarButton = document.querySelector('.profile__avatar-button')


// Форма для редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupEditProfileForm = popupEditProfile.querySelector('.form')
const inputName = popupEditProfileForm.querySelector('.form__input_type_name')
const inputCaption = popupEditProfileForm.querySelector('.form__input_type_caption')


// ИД актуального пользователя
let userDataId = null


// Создание объектов
const userInfo = new UserInfo({nameElement: '.profile__name', captionElement: '.profile__caption', avatarElement: '.profile__avatar-image'})
const popupImage = new PopupWithImage('.popup_type_card')
const popupProfile = new PopupWithForm('.popup_type_edit-profile', editProfileFormSubmitHandler)
const popupAvatar = new PopupWithForm('.popup_type_avatar', avatarFormSubmitHandler)
const formValidatorProfile = new FormValidator(validationConfig, 'edit_profile_form')
const formAvatar = new FormValidator(validationConfig, 'set_avatar_form')
const popupNewCard = new PopupWithForm('.popup_type_add-new-place', newPlaceSubmitHandler)
const popupDeleteCard = new PopupDeleteCard('.popup_type_delete-card')
const formValidatorCard = new FormValidator(validationConfig, 'new_place_form')
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {authorization: '01d5b6ee-513a-413f-980a-2c514bbed36a'}
})
let sectionCards


// Обновление данныых при загрузке страницы
Promise.all([api.getCardsData(), api.getUserData()])
  .then(([dataCards, dataUser]) => {
    userDataId = dataUser._id
    renderUserInfo({name: dataUser.name, caption: dataUser.about, link: dataUser.avatar})
    renderCards(dataCards)
  })
  .catch((err) => console.log(`Ошибка: ${err}`))


// Валидация форм
formValidatorProfile.enableValidation() // профиль пользователя
formAvatar.enableValidation() // аватар пользователя
formValidatorCard.enableValidation() // новая карточка


// Обработчики для контента
function renderUserInfo(dataUser){
  userInfo.setUserInfo(dataUser)
  userInfo.setUserAvatar(dataUser)
}

function renderCards(dataCards){
  sectionCards = new Section({items: Array.from(dataCards).slice(0, 50), renderer: createNewCard}, '.cards')
  sectionCards.renderItems()
}

function createNewCard(data){
  return new Card({
    data: {...data, currentUser: userDataId},
    handleCardClick,
    handleLikeClick,
    handleDeleteCard
    },
    '#card_template')
  .generateCard()
}

function handleCardClick({name, link}){
  popupImage.open(name, link)
}

function handleLikeClick(card){
  if (!card.isLiked()){
    api.setCardLike(card.cardId)
    .then(dataCard => {
      card.updateLikeData(dataCard.likes)
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
  } else {
    api.deleteCardLike(card.cardId)
    .then(dataCard => {
      card.updateLikeData(dataCard.likes)
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
  }
}

function deleteCard(cardElement){
  api.deleteCard(cardElement.cardId)
  .then(() => {
    popupDeleteCard.close()
    popupDeleteCard.cardElement.removeThisCard()
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
}

function handleDeleteCard(cardElement){
  popupDeleteCard.open()
  popupDeleteCard.setCardElement(cardElement)
  popupDeleteCard.setSubmitCallback(deleteCard)
}


// Обработчики для попапов
function renderLoading(evt, isLoading){
  const isLoadingElement = evt.target.querySelector('.form__is-loading')

  if (isLoading){
    isLoadingElement.classList.remove('form__is-loading_disabled')
  } else {
    isLoadingElement.classList.add('form__is-loading_disabled')
  }
}

function openPopupEditProfile(){
  const data = userInfo.getUserInfo()
  popupProfile.open()
  formValidatorProfile.toggleButtonState()
  inputName.value = data.name
  inputCaption.value = data.caption
}

function openPopupAvatar(){
  popupAvatar.open()
}

function avatarFormSubmitHandler(evt, link){
  evt.preventDefault()
  renderLoading(evt, true)

  api.setUserAvatar({avatar: link.link})
  .then((res) => renderUserInfo({name: res.name, caption: res.about, link: res.avatar}))
  .then(() => {
    popupAvatar.close()
    formAvatar.toggleButtonState()
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => {renderLoading(evt, false)})
}

function editProfileFormSubmitHandler(evt, data){
  evt.preventDefault()
  renderLoading(evt, true)
  updateUserInfo(evt, data)
}

function newPlaceSubmitHandler(evt, cardData){
  evt.preventDefault()
  renderLoading(evt, true)
  api.uploadNewCard({name: cardData.name, link: cardData.link})
    .then((cardData) => {
      popupNewCard.close()
      sectionCards.addItem(cardData)
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => renderLoading(evt, false))
}

function updateUserInfo(evt, {name, caption}){
  api.setUserInfo({name: name, about: caption})
    .then((data) => {userInfo.setUserInfo({name: data.name, caption: data.about})})
    .then(() => {
      popupProfile.close()
      formValidatorCard.toggleButtonState()
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {renderLoading(evt, false)})
}

addNewPlaceButton.addEventListener('click', () => { // открыть попап новой карточки
  popupNewCard.open()
  formValidatorCard.toggleButtonState()
})
editButton.addEventListener('click', openPopupEditProfile) // открыть попап профиля
avatarButton.addEventListener('click', openPopupAvatar) // открыть попап профиля
popupImage.setEventListeners() // закрытие попапа
popupProfile.setEventListeners() // закрытие попапа и сабмит формы
popupAvatar.setEventListeners() // закрытие попапа и сабмит формы
popupNewCard.setEventListeners() // закрытие попапа и сабмит формы
popupDeleteCard.setEventListeners() // закрытие попапа и сабмит формы
