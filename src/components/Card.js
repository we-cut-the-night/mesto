export default class Card {
  constructor({data, handleCardClick, handleLikeClick, handleDeleteCard}, idTemplate) {
    this.cardId = data._id
    this._link = data.link
    this._name = data.name
    this._ownerId = data.owner._id
    this._likes = data.likes
    this._currentUserId = data.currentUser
    this._idTemplate = idTemplate
    this._handleCardClick = handleCardClick
    this._handleLikeClick = handleLikeClick
    this._handleDeleteCard = handleDeleteCard
  }

  isLiked(){
    return this._likes.some(user => user._id === this._currentUserId)
  }

  updateLikeData(dataLikes){
    this._likes = dataLikes
    this.updateLikeButton()
  }

  updateLikeButton(){
    if(this.isLiked()){
      this._likeButton.classList.add('card__like-button_active')
    } else {this._likeButton.classList.remove('card__like-button_active')}
    this._likeCount.textContent = this._likes.length
  }

  _getTemplate(){
    return document.querySelector(this._idTemplate).content.querySelector('.card').cloneNode(true)
  }

  _setEventListeners() {
    this._element.querySelector('.card__img').addEventListener('click', () => {this._handleCardClick({link: this._link, name: this._name})})
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this))
    this._element.querySelector('.card__delete').addEventListener('click', () => {this._handleDeleteCard(this)})
  }

  removeThisCard(){
    this._element.remove()
  }

  generateCard(){
    this._element = this._getTemplate()
    this._likeButton = this._element.querySelector('.card__like-button')
    this._likeCount = this._element.querySelector('.card__like-count')
    const newCardImg = this._element.querySelector('.card__img')
    const newCardDelete = this._element.querySelector('.card__delete')

    newCardImg.src = this._link
    newCardImg.alt = this._name
    this._element.querySelector('.card__title').textContent = this._name

    if(this._ownerId === this._currentUserId){
      newCardDelete.classList.remove('card__delete_disabled')
    }

    this.updateLikeButton()
    this._setEventListeners()

    return this._element
  }
}
