export default class Card {
  constructor({data, handleCardClick}, idTemplate) {
    this._link = data.link
    this._name = data.name
    this._idTemplate = idTemplate
    this._handleCardClick = handleCardClick
  }

  _getTemplate(){
    return document.querySelector(this._idTemplate).content.querySelector('.card').cloneNode(true)
  }

  _handleLikeButton(evt){
    evt.target.classList.toggle('card__like_active')
  }

  _setEventListeners() {
    this._element.querySelector('.card__img').addEventListener('click', () => {this._handleCardClick({link: this._link, name: this._name})})
    this._element.querySelector('.card__like').addEventListener('click', (evt) => this._handleLikeButton(evt))
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._element.remove()
      this._element = null
    })
  }

  generateCard(){
    this._element = this._getTemplate()
    const newCardImg = this._element.querySelector('.card__img')
    newCardImg.src = this._link
    newCardImg.alt = this._name
    this._element.querySelector('.card__title').textContent = this._name
    this._setEventListeners()
    return this._element
  }
}
