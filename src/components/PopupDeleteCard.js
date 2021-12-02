import Popup from './Popup.js'

export default class PopupDeleteCard extends Popup{
  constructor(selector){
    super(selector)
    this._formElement = this._element.querySelector('.form')
  }

  setCardElement(cardElement){
    this.cardElement = cardElement
  }

  setSubmitCallback(callback){
    this._handleFormSubmit = callback
  }

  close(){
    super.close()
  }

  setEventListeners(){
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this.cardElement)
    })
  }
}
