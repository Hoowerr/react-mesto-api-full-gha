class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._getResponseData(res));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData)
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(this._getResponseData);
  }
}

const auth = new Auth({
  baseUrl: "https://api.hoower.nomoredomains.rocks",
  // baseUrl: "http://localhost:3001",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default auth;
