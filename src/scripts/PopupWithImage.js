import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
  constructor(selector, callback){
    super(selector, callback)
    this._img = this._element.querySelector('.popup-card__img')
    this._title = this._element.querySelector('.popup-card__title')
  }

  open(name, link){
    super.open()
    this._img.src = link
    this._img.alt = name
    this._title.textContent = name
  }
}
