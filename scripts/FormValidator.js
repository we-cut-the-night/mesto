export default class FormValidator {
  constructor({formElementClass, inputElementClass, inputElementErrorClass
               , errorElementActiveClass, submitButtonClass, submitDisabledButtonClass}
               , formName) {
    this._element = document.getElementsByName(formName)[0]
    this._formElementClass = formElementClass,
    this._inputElementClass = inputElementClass,
    this._inputElementErrorClass = inputElementErrorClass,
    this._errorElementActiveClass = errorElementActiveClass,
    this._submitButtonClass = submitButtonClass,
    this._submitDisabledButtonClass = submitDisabledButtonClass
  }

  _showError(inputElement, errorMessage) {
    const errorElement = document.getElementById(`${inputElement.id}-error`)
    inputElement.classList.add(this._inputElementErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._errorElementActiveClass)
  };

  _hideError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}-error`)
    inputElement.classList.remove(this._inputElementErrorClass)
    errorElement.classList.remove(this._errorElementActiveClass)
    errorElement.textContent=''
  }

  _checkInputValidity (inputElement) {
    if(!inputElement.validity.valid){
      this._showError(inputElement, inputElement.validationMessage)
    } else {
      this._hideError(inputElement)
    }
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._submitDisabledButtonClass)
    } else {
      buttonElement.classList.remove(this._submitDisabledButtonClass)
    }
  }

  enableValidation(){
    const inputList = Array.from(this._element.querySelectorAll(this._inputElementClass))
    const buttonElement = this._element.querySelector(this._submitButtonClass)

    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    this._element.addEventListener('reset', (evt) => {
      inputList.forEach((inputElement) => this._hideError(inputElement))
    })

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(inputList, buttonElement)
      })
    })

    this._toggleButtonState(inputList, buttonElement)
  }
}

