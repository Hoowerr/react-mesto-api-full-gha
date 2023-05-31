class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  removeCard(id) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  addLike(id) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  removeLike(id) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  setAvatar(data) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
        
      },
    }).then(this._checkResponse);
  }

  editUserInfo(data) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(_id, isLiked) {
    return !isLiked ? this.addLike(_id) : this.removeLike(_id);
  }
}

const api = new Api({
  baseUrl: "https://api.hoower.nomoredomains.rocks",
  // baseUrl: "http://localhost:3001",
  headers: {
    Accept: 'application/json',
    "Content-Type": "application/json",
  },
});
export default api;
