// Импорт классов и переменных
import './index.css'
import UserInfo from '../components/UserInfo.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import FormValidator from '../components/FormValidator.js'
import {initialCards, validationConfig, userInfoData} from '../utils/constants.js'


// DOM: кнопки
const editButton = document.querySelector('.profile__edit')
const addNewPlaceButton = document.querySelector('.profile__button')


// DOM: форма для редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupEditProfileForm = popupEditProfile.querySelector('.form')
const inputName = popupEditProfileForm.querySelector('.form__input_type_name')
const inputCaption = popupEditProfileForm.querySelector('.form__input_type_caption')


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
  sectionCards.addItem({name: cardData.name, link: cardData.link})
  popupNewCard.close()
  formValidatorCard.toggleButtonState()
}


// Объекты: создание экземпляров классов
const userInfo = new UserInfo({nameElement: '.profile__name', captionElement: '.profile__caption'})
const sectionCards = new Section({items: initialCards.reverse(), renderer: createNewCard}, '.cards')
const popupImage = new PopupWithImage('.popup_type_card')
const popupProfile = new PopupWithForm('.popup_type_edit-profile', editProfileFormSubmitHandler)
const formValidatorProfile = new FormValidator(validationConfig, 'edit_profile_form')
const popupNewCard = new PopupWithForm('.popup_type_add-new-place', newPlaceSubmitHandler)
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
