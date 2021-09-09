let editButton = document.querySelector('.profile__edit');
let popUp = document.querySelector('.popup');
let popUpForm = popUp.querySelector('.popup__form');
let editCloseButton = popUpForm.querySelector('.popup__form-close');
let popUpSubmit = popUpForm.querySelector('.popup__form-submit');
let profileName = document.querySelector('.profile__name');
let profileCapt = document.querySelector('.profile__caption');

function popUpOpen() {
  popUp.classList.add('popup_opened');
};

function popUpClose() {
  popUp.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault();

  let inputName = document.querySelector('.popup__input-name');
  let inputDesc = document.querySelector('.popup__input-description');

  if (inputName.value.length > 0 && inputDesc.value.length > 0) {
    profileName.textContent = inputName.value;
    profileCapt.textContent = inputDesc.value;
   };

  inputName.value = null;
  inputDesc.value = null;

  popUpClose();
};

popUpForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', popUpOpen);
editCloseButton.addEventListener('click', popUpClose);


