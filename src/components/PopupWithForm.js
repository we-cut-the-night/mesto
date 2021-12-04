import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor(selector, callbackSubmit){
    super(selector)
    this._handleFormSubmit = callbackSubmit
    this._formElement = this._element.querySelector('.form')
    this._inputList = Array.from(this._element.querySelectorAll('.form__input'))
  }

  _getInputValues(){
    this._formValues = {}
    this._inputList.forEach(input => this._formValues[input.name] = input.value)
    return this._formValues
  }

  close(){
    super.close()
    this._formElement.reset()
  }

  setEventListeners(){
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => {
      this._handleFormSubmit(evt, this._getInputValues())
    })
  }
}
