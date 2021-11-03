export default class UserInfo{
  constructor({nameElement, captionElement}){
    this._profileName = document.querySelector(nameElement)
    this._profileCaption = document.querySelector(captionElement)
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
}
