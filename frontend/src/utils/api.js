class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
          authorization: `${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        }
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  cancelLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
  // headers: {
  //   // authorization: '07cf89e3-4dde-4a9f-9c59-e93fe0d43902',
  //   'Content-Type': 'application/json'
  // }
}); 

export default api;