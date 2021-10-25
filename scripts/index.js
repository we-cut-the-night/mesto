import {initialCards, validationConfig, ESC_CODE} from './constants.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'


// Профиль пользователя
const editButton = document.querySelector('.profile__edit')
const profileName = document.querySelector('.profile__name')
const profileCaption = document.querySelector('.profile__caption')

// Форма для редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const editCloseButton = popupEditProfile.querySelector('.popup__close')
const popupEditProfileForm = popupEditProfile.querySelector('.form')
const inputName = popupEditProfileForm.querySelector('.form__input_type_name')
const inputCaption = popupEditProfileForm.querySelector('.form__input_type_caption')

// Галерея
const addNewPlaceButton = document.querySelector('.profile__button')
const popupAddNewPlace = document.querySelector('.popup_type_add-new-place')
const addNewPlaceCloseButton = popupAddNewPlace.querySelector('.popup__close')
const popupNewPlaceForm = document.querySelector('.form[name=new_place_form]')
const inputNewPlaceName = popupNewPlaceForm.querySelector('.form__input_type_name')
const inputNewPlaceLink = popupNewPlaceForm.querySelector('.form__input_type_link')
const cardsContainer = document.querySelector('.cards')

// Попап с фото
const popupCard = document.querySelector('.popup_type_card')
const popupCardImg = popupCard.querySelector('.popup-card__img')
const popupCardClose = popupCard.querySelector('.popup__close')

//Валидация форм
const FormValidatorProfile = new FormValidator(validationConfig, 'edit_profile_form')
const FormValidatorCard = new FormValidator(validationConfig, 'new_place_form')


// Объявление функций
function openPopup(element){
  element.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEsc)
}

function closePopup(element){
  element.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEsc)
}

function openPopupEditProfile(){
  openPopup(popupEditProfile)

  inputName.value = profileName.textContent
  inputCaption.value = profileCaption.textContent
}

function editProfileFormSubmitHandler(config, evt) {
  const buttonElement = popupEditProfile.querySelector(config.submitButtonClass)
  evt.preventDefault()

  profileName.textContent = inputName.value
  profileCaption.textContent = inputCaption.value

  closePopup(popupEditProfile)

  buttonElement.classList.add(config.submitDisabledButtonClass)
}

function newPlaceSubmitHandler(config, evt){
  evt.preventDefault()

  const buttonElement = popupAddNewPlace.querySelector(config.submitButtonClass)
  const newCardData = {name: inputNewPlaceName.value, link: inputNewPlaceLink.value}

  cardsContainer.prepend(new Card(newCardData, '#card_template').generateCard())

  closePopup(popupAddNewPlace)
  popupNewPlaceForm.reset()
  buttonElement.classList.add(config.submitDisabledButtonClass)
}

function resetForm(element){
  const formElement = element.querySelector('.form')
  if(formElement){
    formElement.reset()
  }
}

function closeByEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if (evt.key === ESC_CODE) {
    resetForm(popupOpened)
    closePopup(popupOpened)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function openPopupCard(data){
  openPopup(popupCard)
  popupCardImg.src = data.link
  popupCardImg.alt = data.name
  popupCard.querySelector('.popup-card__title').textContent = data.name
}


// Дейстивия при загрузке страницы
initialCards.reverse().forEach((data) => {
  const newCard = new Card(data, '#card_template').generateCard()
  newCard.querySelector('.card__img').addEventListener('click', () => openPopupCard(data))
  cardsContainer.prepend(newCard)
})

FormValidatorProfile.enableValidation()
FormValidatorCard.enableValidation()


// Слушатели событий: добавление фото в галерею
addNewPlaceButton.addEventListener('click', () => openPopup(popupAddNewPlace))

popupNewPlaceForm.addEventListener('submit', (evt) => {
  const inputList = Array.from(popupNewPlaceForm.querySelectorAll('.form__input'))

  if (!hasInvalidInput(inputList)) {
    newPlaceSubmitHandler(validationConfig, evt)
  }
})

popupAddNewPlace.addEventListener('mousedown', (evt) => {
  if(evt.target.classList.contains('popup')){
    popupNewPlaceForm.reset()
    closePopup(popupAddNewPlace)
  }
})

addNewPlaceCloseButton.addEventListener('click', (evt) => {
  closePopup(popupAddNewPlace)
  resetForm(popupAddNewPlace)
})

popupCardClose.addEventListener('click', () => closePopup(popupCard))

popupCard.addEventListener('mousedown', (evt) => {
  if(evt.target.classList.contains('popup')){
    closePopup(popupCard)
  }
})


// Слушатели событий: редактирование профиля
editButton.addEventListener('click', openPopupEditProfile)
editCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile)
  resetForm(popupEditProfile)
})

popupEditProfile.addEventListener('mousedown', (evt) => {
  if(evt.target.classList.contains('popup')){
    popupEditProfileForm.reset()
    closePopup(popupEditProfile)
  }
})

popupEditProfileForm.addEventListener('submit', (evt) => {
  const inputList = Array.from(popupEditProfileForm.querySelectorAll('.form__input'))

  if (!hasInvalidInput(inputList)) {
    editProfileFormSubmitHandler(validationConfig, evt)
  }
})
