// Профиль пользователя
const editButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const addNewPlaceButton = document.querySelector('.profile__button');

// Форма для редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const inputName = popupEditProfileForm.querySelector('.popup__input_type_name');
const inputCaption = popupEditProfileForm.querySelector('.popup__input_type_caption');
const editCloseButton = popupEditProfileForm.querySelector('.popup__form-close');

// Форма для загрузки фото
const popupAddNewPlace = document.querySelector('.popup_type_add-new-place');
const popupNewPlaceForm = document.querySelector('.popup__form[name=new_place_form]');
const inputNewPlaceName = popupNewPlaceForm.querySelector('.popup__input_type_name');
const inputNewPlaceLink = popupNewPlaceForm.querySelector('.popup__input_type_link');
const addNewPlaceCloseButton = popupNewPlaceForm.querySelector('.popup__form-close');

// Попап с фото
const popupCard = document.querySelector('.popup-card');
const popupCardClose = popupCard.querySelector('.popup-card__close');
const popupCardImg = popupCard.querySelector('.popup-card__img');
const popupCardTitle = popupCard.querySelector('.popup-card__title');

// Добавление новых фотографий
const cardTemplate = document.querySelector('#card_template').content;
const cardsContainer = document.querySelector('.cards');

function changePopupVisibility(element, classname){
  element.classList.toggle(classname);
};

function popupInputData(){
  changePopupVisibility(popupEditProfile, 'popup_opened');

  inputName.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
};

function popupInputImg(link, name){
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
    changePopupVisibility(popupCard, 'popup-card_opened');
    popupInputImg(link, name);
  });

  newCard.querySelector('.card__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like_active');
  });

  newCard.querySelector('.card__delete').addEventListener('click', () => {
    newCard.remove();
  });

  return newCard;
};

function addNewCard (newCard) {
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

  const newCard = createNewCard(newLink, newName);
  addNewCard(newCard);
  changePopupVisibility(popupAddNewPlace, 'popup_opened');

  inputNewPlaceName.value = null;
  inputNewPlaceLink.value = null;
};

initialCards.reverse().forEach(item => {
  const newCard = createNewCard(item.link, item.name);
  addNewCard(newCard);
});

addNewPlaceButton.addEventListener('click', () => changePopupVisibility(popupAddNewPlace, 'popup_opened'));
popupNewPlaceForm.addEventListener('submit', newPlaceSubmitHandler);
editButton.addEventListener('click', popupInputData);
editCloseButton.addEventListener('click', () => changePopupVisibility(popupEditProfile, 'popup_opened'));
popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
addNewPlaceCloseButton.addEventListener('click', () => changePopupVisibility(popupAddNewPlace, 'popup_opened'));
popupCardClose.addEventListener('click', () => changePopupVisibility(popupCard, 'popup-card_opened'));
