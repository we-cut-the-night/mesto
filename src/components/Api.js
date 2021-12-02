// cohort-30 : '01d5b6ee-513a-413f-980a-2c514bbed36a'

export default class Api {
  constructor({url, headers}) {
    this._url = url
    this._headers = headers
  }

  _onResponse(res){
    return res.ok ? res.json() : Promise.reject(`Error: ${res}`)
  }

  getCardsData() {
    return fetch(`${this._url}/cards`, {headers: this._headers})
    .then(this._onResponse)
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {headers: this._headers})
    .then(this._onResponse)
  }

  setCardLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {method: 'PUT', headers: this._headers})
    .then(this._onResponse)
  }

  deleteCardLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {method: 'DELETE', headers: this._headers})
    .then(this._onResponse)
  }

  uploadNewCard(data) {
    return fetch(`${this._url}/cards/`, {
                  method: 'POST',
                  headers: {authorization: '01d5b6ee-513a-413f-980a-2c514bbed36a', 'Content-Type': 'application/json'},
                  body: JSON.stringify(data)
                })
    .then(this._onResponse)
  }

  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {method: 'DELETE', headers: this._headers})
           .then(this._onResponse)
  }

  setUserInfo(data){
    return fetch(`${this._url}/users/me`, {
           method: 'PATCH',
           headers: {authorization: '01d5b6ee-513a-413f-980a-2c514bbed36a', 'Content-Type': 'application/json'},
           body: JSON.stringify(data)
           })
    .then(this._onResponse)
  }

  setUserAvatar(data){
    return fetch(`${this._url}/users/me/avatar`, {
           method: 'PATCH',
           headers: {authorization: '01d5b6ee-513a-413f-980a-2c514bbed36a', 'Content-Type': 'application/json'},
           body: JSON.stringify(data)
           })
    .then(this._onResponse)
  }
}
