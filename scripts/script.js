// Профиль пользователя
const editButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileCapt = document.querySelector('.profile__caption');
const addNewPlaceButton = document.querySelector('.profile__button');

// Форма для редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupForm = popupEditProfile.querySelector('.popup__form');
const inputName = popupForm.querySelector('.popup__input_type_name');
const inputDesc = popupForm.querySelector('.popup__input_type_description');
const editCloseButton = popupForm.querySelector('.popup__form-close');
const popupSubmit = popupForm.querySelector('.popup__form-submit');

// Форма для загрузки фото
const popupAddNewPlace = document.querySelector('.popup_type_add-new-place');
const popupNewPlace = document.querySelector('.popup__form[name=new_place_form]');
const inputNewPlaceName = popupNewPlace.querySelector('.new-place__input_type_name');
const inputNewPlaceLink = popupNewPlace.querySelector('.new-place__input_type_link');
const newPlaceSubmit = popupNewPlace.querySelector('.popup__form-submit');
const addNewPlaceCloseButton = popupNewPlace.querySelector('.popup__form-close');

// Попап с фото
const popupCard = document.querySelector('.popup-card');
const popupCardClose = popupCard.querySelector('.popup-card__close');
const popupCardImg = popupCard.querySelector('.popup-card__img');
const popupCardTitle = popupCard.querySelector('.popup-card__title');

function popupVisibility(el, vi, op) {
  el.style.visibility = vi;
  el.style.opacity = op;
};

function popupInputData() {
  popupVisibility(popupEditProfile, 'visible', 1);

  inputName.value = profileName.textContent;
  inputDesc.value = profileCapt.textContent;
};

function popupInputImg(link, name){
  popupCardImg.src = link;
  popupCardImg.alt = name;
  popupCardTitle.textContent = name;
};

function addNewCard (link, name, order='asc'){
  const cardTemplate = document.querySelector('#card_template').content;
  const cardsContainer = document.querySelector('.cards');
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__img').src = link;
  newCard.querySelector('.card__img').alt = name;
  newCard.querySelector('.card__title').textContent = name;

  newCard.querySelector('.card__img').addEventListener('click', function(evt){
    popupVisibility(popupCard, 'visible', 1);
    popupInputImg(link, name);
  });

  newCard.querySelector('.card__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like_active');
  });

  newCard.querySelector('.card__delete').addEventListener('click', () => {
    newCard.closest('.card').remove();
  });

  if (order === 'desc') {
    cardsContainer.prepend(newCard);
  } else {
    cardsContainer.append(newCard);
  };
};

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileCapt.textContent = inputDesc.value;

  popupVisibility(popupEditProfile, 'hidden', 0);
};

function newPlaceSubmitHandler(evt){
  evt.preventDefault();

  const newName = inputNewPlaceName.value;
  const newLink = inputNewPlaceLink.value;

  addNewCard(newLink, newName, 'desc');
  popupVisibility(popupAddNewPlace, 'hidden', 0);
};

addNewPlaceButton.addEventListener('click', () => popupVisibility(popupAddNewPlace, 'visible', 1));
popupNewPlace.addEventListener('submit', newPlaceSubmitHandler);
editButton.addEventListener('click', popupInputData);
editCloseButton.addEventListener('click', () => popupVisibility(popupEditProfile, 'hidden', 0));
popupForm.addEventListener('submit', formSubmitHandler);
addNewPlaceCloseButton.addEventListener('click', () => popupVisibility(popupAddNewPlace, 'hidden', 0));
popupCardClose.addEventListener('click', () => popupVisibility(popupCard, 'hidden', 0));


// Добавление дефолтных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Екатеринбург',
    link: 'https://images.unsplash.com/photo-1606211204812-a545455a3b10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  //{
  //  name: 'Иваново',
  //  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  //},
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(item => {addNewCard(item.link, item.name)});
