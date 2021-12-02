export default class UserInfo{
  constructor({nameElement, captionElement, avatarElement}){
    this._profileName = document.querySelector(nameElement)
    this._profileCaption = document.querySelector(captionElement)
    this._profileAvatar = document.querySelector(avatarElement)
  }

  getUserInfo(){
    const name = this._profileName.textContent
    const caption = this._profileCaption.textContent
    return {name, caption}
  }

  setUserInfo({name, caption}){
    this._profileName.textContent = name
    this._profileCaption.textContent = caption
  }

  setUserAvatar({link}){
    this._profileAvatar.src = link
    this._profileAvatar.alt = this._profileName
  }
}
