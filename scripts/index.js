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
const formValidatorProfile = new FormValidator(validationConfig, 'edit_profile_form')
const formValidatorCard = new FormValidator(validationConfig, 'new_place_form')


// Объявление функций
function openPopup(element){
  element.classList.add('popup_opened')
  resetForm(element)
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

function createNewCard(data, idTemplate){
  return new Card(data, idTemplate, openPopupCard).generateCard()
}

function editProfileFormSubmitHandler(evt) {
  //const buttonElement = popupEditProfile.querySelector(config.submitButtonClass)
  evt.preventDefault()

  profileName.textContent = inputName.value
  profileCaption.textContent = inputCaption.value

  closePopup(popupEditProfile)

  formValidatorCard.toggleButtonState()
}

function newPlaceSubmitHandler(evt){
  evt.preventDefault()
  cardsContainer.prepend(createNewCard({name: inputNewPlaceName.value, link: inputNewPlaceLink.value}, '#card_template'))
  closePopup(popupAddNewPlace)
  formValidatorCard.toggleButtonState()
}

function resetForm(element){
  const formElement = element.querySelector('.form')
  if(formElement){
    formElement.reset()
    formValidatorCard.toggleButtonState()
    formValidatorProfile.toggleButtonState()
  }
}

function closeByOverlayClick(evt) {
  if(evt.target.classList.contains('popup')){
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup)
}}

function closeByEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if (evt.key === ESC_CODE) {
    closePopup(popupOpened)
  }
}

function openPopupCard(data){
  openPopup(popupCard)

  popupCardImg.src = data.link
  popupCardImg.alt = data.name
  popupCard.querySelector('.popup-card__title').textContent = data.name
}


// Дейстивия при загрузке страницы
initialCards.reverse().forEach((data) => {
  cardsContainer.prepend(createNewCard(data, '#card_template'))
})

formValidatorProfile.enableValidation()
formValidatorCard.enableValidation()


// Слушатели событий: добавление фото в галерею
addNewPlaceButton.addEventListener('click', () => openPopup(popupAddNewPlace))
popupNewPlaceForm.addEventListener('submit', newPlaceSubmitHandler)
popupAddNewPlace.addEventListener('mousedown', closeByOverlayClick)

addNewPlaceCloseButton.addEventListener('click', (evt) => {
  closePopup(popupAddNewPlace)
})

popupCardClose.addEventListener('click', () => closePopup(popupCard))
popupCard.addEventListener('mousedown', closeByOverlayClick)


// Слушатели событий: редактирование профиля
editButton.addEventListener('click', openPopupEditProfile)

editCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile)
})

popupEditProfile.addEventListener('mousedown', closeByOverlayClick)
popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler)
