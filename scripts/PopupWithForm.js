import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor(selector, callback, callbackSubmit){
    super(selector, callback)
    this._handleFormSubmit = callbackSubmit
    this._formElement = this._element.querySelector('.form')
    this._inputList = Array.from(this._element.querySelectorAll('.form__input'))
  }

  _getInputValues(){
    return {name: this._inputList[0].value, caption: this._inputList[1].value}
  }

  close(){
    super.close()
    this._formElement.reset()
  }

  setEventListeners(){
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._getInputValues()))
  }
}
