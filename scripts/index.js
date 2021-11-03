// Импорт классов и переменных
import UserInfo from './UserInfo.js'
import Card from './Card.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import FormValidator from './FormValidator.js'
import {initialCards, validationConfig, userInfoData, ESC_CODE} from './constants.js'


// DOM: профиль пользователя
const editButton = document.querySelector('.profile__edit')


// DOM: форма для редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupEditProfileForm = popupEditProfile.querySelector('.form')
const inputName = popupEditProfileForm.querySelector('.form__input_type_name')
const inputCaption = popupEditProfileForm.querySelector('.form__input_type_caption')


// DOM: галерея
const cardsContainer = document.querySelector('.cards')
const addNewPlaceButton = document.querySelector('.profile__button')


// Объявление функций
function handleCardClick({name, link}){
  popupImage.open(name, link)
}

function createNewCard(data){
  return new Card({data, handleCardClick}, '#card_template').generateCard()
}

function openPopupEditProfile(){
  const data = userInfo.getUserInfo()
  popupProfile.open()
  formValidatorProfile.toggleButtonState()
  inputName.value = data.name
  inputCaption.value = data.caption
}

function editProfileFormSubmitHandler(evt, data){
  evt.preventDefault()
  userInfo.setUserInfo(data)
  popupProfile.close()
  formValidatorCard.toggleButtonState()
}

function newPlaceSubmitHandler(evt, cardData){
  evt.preventDefault()
  cardsContainer.prepend(createNewCard({name: cardData.name, link: cardData.caption}))
  popupNewCard.close()
  formValidatorCard.toggleButtonState()
}

function handleEscClose(evt){
  if (evt.key === ESC_CODE){
    const popupOpened = document.querySelector('.popup_opened')
    popupOpened.classList.remove('popup_opened')
    document.removeEventListener('keydown', handleEscClose)
  }
}

// Объекты: создание экземпляров классов
const userInfo = new UserInfo({nameElement: '.profile__name', captionElement: '.profile__caption'})
const sectionCards = new Section({items: initialCards.reverse(), renderer: createNewCard}, '.cards')
const popupImage = new PopupWithImage('.popup_type_card', handleEscClose)
const popupProfile = new PopupWithForm('.popup_type_edit-profile', handleEscClose, editProfileFormSubmitHandler)
const formValidatorProfile = new FormValidator(validationConfig, 'edit_profile_form')
const popupNewCard = new PopupWithForm('.popup_type_add-new-place', handleEscClose, newPlaceSubmitHandler)
const formValidatorCard = new FormValidator(validationConfig, 'new_place_form')


// Дейстивия при загрузке страницы
userInfo.setUserInfo(userInfoData) // заполнение профиля пользователя
sectionCards.renderItems() // заполнение галереи с карточками
formValidatorProfile.enableValidation() // активация валидации формы для редактирования профиля
formValidatorCard.enableValidation() // активация валидации формы для добавления новой карточки


// Слушатели событий: открытие попапа с формой
addNewPlaceButton.addEventListener('click', () => { // слушатель кнопки открытия формы добавления новой карточки
  popupNewCard.open()
  formValidatorCard.toggleButtonState()
})
editButton.addEventListener('click', openPopupEditProfile) // слушатель кнопки открытия формы редактирования профиля
popupImage.setEventListeners() // слушатели на закрытие попапа
popupProfile.setEventListeners() // слушатели на закрытие попапа и сабмит формы
popupNewCard.setEventListeners() // слушатели на закрытие попапа и сабмит формы
