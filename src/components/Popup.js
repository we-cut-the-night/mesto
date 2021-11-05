import {ESC_CODE} from '../utils/constants.js'

export default class Popup {
  constructor(selector){
    this._element = document.querySelector(selector)
    this._handleEsc = this._handleEscClose.bind(this)
  }

  _closeByOverlayClick(evt){
    if(evt.target.classList.contains('popup')){
      this.close()
    }
  }

  _handleEscClose(evt){
    if (evt.key === ESC_CODE){
      this.close()
    }
  }

  open(){
    this._element.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEsc)
  }

  close(){
    this._element.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEsc)
  }

  setEventListeners(){
    this._element.querySelector('.popup__close').addEventListener('click', this.close.bind(this))
    this._element.addEventListener('mousedown', this._closeByOverlayClick.bind(this))
  }
}
