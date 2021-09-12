let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let inputName = popupForm.querySelector('.popup__input_type_name');
let inputDesc = popupForm.querySelector('.popup__input_type_description');
let editCloseButton = popupForm.querySelector('.popup__form-close');
let popupSubmit = popupForm.querySelector('.popup__form-submit');
let profileName = document.querySelector('.profile__name');
let profileCapt = document.querySelector('.profile__caption');

function popupInputData() {
  inputName.value = profileName.textContent;
  inputDesc.value = profileCapt.textContent;
};

function popupOpen() {
  popup.classList.add('popup_opened');

  popupInputData();
};

function popupClose() {
  popup.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileCapt.textContent = inputDesc.value;

  popupClose();
};

popupForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', popupOpen);
editCloseButton.addEventListener('click', popupClose);


