const showError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  inputElement.classList.add(config.inputElementErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorElementActiveClass);
};

const hideError = (config, formElement, inputElement) => {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  inputElement.classList.remove(config.inputElementErrorClass);
  errorElement.classList.remove(config.errorElementActiveClass);
  errorElement.textContent='';
};

const checkInputValidity = (config, formElement, inputElement) => {
  if(!inputElement.validity.valid){
    showError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(config, formElement, inputElement);
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (config, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.submitDisabledButtonClass);
  } else {
    buttonElement.classList.remove(config.submitDisabledButtonClass);
  }
};

const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputElementClass));
  const buttonElement = formElement.querySelector(config.submitButtonClass);
  toggleButtonState(config, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formElementClass));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    formElement.addEventListener('reset', (evt) => {
      const inputList = Array.from(formElement.querySelectorAll(config.inputElementClass));
      inputList.forEach((inputElement) => {
        hideError(config, formElement, inputElement);
      });
    });
    setEventListeners(config, formElement);
  });
}

enableValidation(validationConfig);
