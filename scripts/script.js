// Профиль пользователя
const editButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

// Форма для редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editCloseButton = popupEditProfile.querySelector('.popup__close');
const popupEditProfileForm = popupEditProfile.querySelector('.form');
const inputName = popupEditProfileForm.querySelector('.form__input_type_name');
const inputCaption = popupEditProfileForm.querySelector('.form__input_type_caption');
const popupOpened = document.querySelector('popup_opened');

// Загрузка фото
const addNewPlaceButton = document.querySelector('.profile__button')
const popupAddNewPlace = document.querySelector('.popup_type_add-new-place');
const addNewPlaceCloseButton = popupAddNewPlace.querySelector('.popup__close');
const popupNewPlaceForm = document.querySelector('.form[name=new_place_form]');
const inputNewPlaceName = popupNewPlaceForm.querySelector('.form__input_type_name');
const inputNewPlaceLink = popupNewPlaceForm.querySelector('.form__input_type_link');

// Попап с фото
const popupCard = document.querySelector('.popup_type_card');
const popupCardClose = popupCard.querySelector('.popup__close');
const popupCardImg = popupCard.querySelector('.popup-card__img');
const popupCardTitle = popupCard.querySelector('.popup-card__title');

// Добавление новых фотографий
const cardTemplate = document.querySelector('#card_template').content;
const cardsContainer = document.querySelector('.cards');

function openPopup(element){
  element.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => closeByEsc(evt, element));
};

function closePopup(element){
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown',  (evt) => closeByEsc(evt, element));
};

function closeByEsc(evt, element) {
  if (evt.key === ESC_CODE) {
    resetForm(element);
    closePopup(element);
  }
};

function openPopupEditProfile(){
  openPopup(popupEditProfile);

  inputName.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
};

function setPopupCardElements(link, name){
  popupCardImg.src = link;
  popupCardImg.alt = name;
  popupCardTitle.textContent = name;
};

function createNewCard (link, name){
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const newCardImg = newCard.querySelector('.card__img');

  newCardImg.src = link;
  newCardImg.alt = name;
  newCard.querySelector('.card__title').textContent = name;

  newCardImg.addEventListener('click', function(evt){
    openPopup(popupCard);
    setPopupCardElements(link, name);
  });

  newCard.querySelector('.card__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like_active');
  });

  newCard.querySelector('.card__delete').addEventListener('click', () => {
    newCard.remove();
  });

  return newCard;
};

function addNewCard (link, name) {
  const newCard = createNewCard(link, name);
  cardsContainer.prepend(newCard);
};

function editProfileFormSubmitHandler(config, evt) {
  const buttonElement = popupEditProfile.querySelector(config.submitButtonClass);
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileCaption.textContent = inputCaption.value;

  closePopup(popupEditProfile);

  buttonElement.classList.add(config.submitDisabledButtonClass);
};

function newPlaceSubmitHandler(config, evt){
  const buttonElement = popupAddNewPlace.querySelector(config.submitButtonClass);
  evt.preventDefault();

  const newName = inputNewPlaceName.value;
  const newLink = inputNewPlaceLink.value;

  addNewCard(newLink, newName);
  closePopup(popupAddNewPlace);

  popupNewPlaceForm.reset();

  buttonElement.classList.add(config.submitDisabledButtonClass);
};

function resetForm(element){
  console.log('reset')
  const formElement = element.querySelector('.form');
  if(formElement){
    formElement.reset();
  }
};

initialCards.reverse().forEach(item => addNewCard(item.link, item.name));

addNewPlaceButton.addEventListener('click', () => openPopup(popupAddNewPlace));
popupNewPlaceForm.addEventListener('submit', (evt) => {
  const inputList = Array.from(popupNewPlaceForm.querySelectorAll('.form__input'));
  if (!hasInvalidInput(inputList)) {
    newPlaceSubmitHandler(validationConfig, evt);
  };
});

editButton.addEventListener('click', openPopupEditProfile);
editCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
  resetForm(popupEditProfile);
});

popupEditProfile.addEventListener('mousedown', (evt) => {
  if(evt.target.classList.contains('popup')){
    closePopup(popupEditProfile);
  }
});

popupAddNewPlace.addEventListener('mousedown', (evt) => {
  if(evt.target.classList.contains('popup')){
    closePopup(popupAddNewPlace);
  }
});

popupCard.addEventListener('mousedown', (evt) => {
  if(evt.target.classList.contains('popup')){
    closePopup(popupCard);
  }
});

popupEditProfileForm.addEventListener('submit', (evt) => {
  const inputList = Array.from(popupEditProfileForm.querySelectorAll('.form__input'));
  if (!hasInvalidInput(inputList)) {
    editProfileFormSubmitHandler(validationConfig, evt);
  };
});

addNewPlaceCloseButton.addEventListener('click', (evt) => {
  closePopup(popupAddNewPlace);
  resetForm(popupAddNewPlace);
});
popupCardClose.addEventListener('click', () => closePopup(popupCard));
