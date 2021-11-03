export default class Popup {
  constructor(selector, callback){
    this._element = document.querySelector(selector)
    this._handleEsc = callback
  }

  _closeByOverlayClick(evt){
    if(evt.target.classList.contains('popup')){
      this.close()
    }
  }

  open(){
    this._element.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEsc)
  }

  close(){
    const popupOpened = document.querySelector('.popup_opened')
    popupOpened.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEsc)
  }

  setEventListeners(){
    this._element.querySelector('.popup__close').addEventListener('click', this.close.bind(this))
    this._element.addEventListener('mousedown', this._closeByOverlayClick.bind(this))
  }
}
