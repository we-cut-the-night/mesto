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

function changePopupVisibility(element, classname){
  element.classList.toggle(classname);
};

function inputProfileData(){
  changePopupVisibility(popupEditProfile, 'popup_opened');

  inputName.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
};

function inputCardImg(link, name){
  popupCardImg.src = link;
  popupCardImg.alt = name;
  popupCardTitle.textContent = name;
};

function createNewCard (link, name){
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__img').src = link;
  newCard.querySelector('.card__img').alt = name;
  newCard.querySelector('.card__title').textContent = name;

  newCard.querySelector('.card__img').addEventListener('click', function(evt){
    changePopupVisibility(popupCard, 'popup_opened');
    inputCardImg(link, name);
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

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileCaption.textContent = inputCaption.value;

  changePopupVisibility(popupEditProfile, 'popup_opened');
};

function newPlaceSubmitHandler(evt){
  evt.preventDefault();

  const newName = inputNewPlaceName.value;
  const newLink = inputNewPlaceLink.value;

  const newCard = addNewCard(newLink, newName);
  changePopupVisibility(popupAddNewPlace, 'popup_opened');

  inputNewPlaceName.value = null;
  inputNewPlaceLink.value = null;
};

initialCards.reverse().forEach(item => addNewCard(item.link, item.name));

addNewPlaceButton.addEventListener('click', () => changePopupVisibility(popupAddNewPlace, 'popup_opened'));
popupNewPlaceForm.addEventListener('submit', newPlaceSubmitHandler);
editButton.addEventListener('click', inputProfileData);
editCloseButton.addEventListener('click', () => changePopupVisibility(popupEditProfile, 'popup_opened'));
popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
addNewPlaceCloseButton.addEventListener('click', () => changePopupVisibility(popupAddNewPlace, 'popup_opened'));
popupCardClose.addEventListener('click', () => changePopupVisibility(popupCard, 'popup_opened'));
