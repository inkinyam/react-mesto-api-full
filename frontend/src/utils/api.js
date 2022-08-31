 class Api {
  constructor (baseUrl, {headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

// получаем токен из localStorage и записываем его в хедерс
  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return jwt ? { Authorization: `Bearer ${jwt}` } : {};
  }


//метод, проверяющий какой результат пришел, возвращает объект если ок, и ошибку, если нет
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

//метод, который реализует получение карточки с сервера
  getCards () {
    return fetch (`${this.baseUrl}/cards`, {
      headers: {...this.headers, ...this._getHeaders()},
    })
    .then (res => {return this._checkRes(res)})
  }

 // метод, который реализует получение данные пользователя с сервера
  getUserData () {
    return fetch (`${this.baseUrl}/users/me`, {
      headers: {...this.headers, ...this._getHeaders()},
    })
    .then (res => {return this._checkRes(res)})
  }

 // метод, который реализует редактирование данных пользователя на сервере
  postUserData (userName, about){
    return fetch (`${this.baseUrl}/users/me`, {
      headers: {...this.headers, ...this._getHeaders()},
      method: 'PATCH',
      body: JSON.stringify({name: userName, about: about}),
    })
    .then (res => {return this._checkRes(res)})
  }

  //  метод, который реализует редактирование автара пользователя на сервере
  postUserPhoto (link){
    return fetch (`${this.baseUrl}/users/me/avatar`, {
      headers: {...this.headers, ...this._getHeaders()},
      method: 'PATCH',
      body: JSON.stringify({avatar: link}),
    })
    .then (res => {return this._checkRes(res)})
  }

// метод, который реализует отправление карточки на сервер
  postCard (cardName, link){
    return fetch (`${this.baseUrl}/cards`, {
      headers: {...this.headers, ...this._getHeaders()},
      method: 'POST',
      body: JSON.stringify({name: cardName, link: link}),
    })
    .then (res => {return this._checkRes(res)})
  }

// метод, который реализует установку лайка на карточку
  putLike (cardId){
    return fetch (`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: {...this.headers, ...this._getHeaders()},
      method: 'PUT',
    })
    .then (res => {return this._checkRes(res)})
  }

// метод, который реализует удаление лайка с карточки
  deleteLike (cardId){
    return fetch (`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: {...this.headers, ...this._getHeaders()},
      method: 'DELETE',
    })
    .then (res => {return this._checkRes(res)})
  }

// метод, который реализует удаление карточки с сервера  
  deleteCard (cardId) {
    return fetch (`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {...this.headers, ...this._getHeaders()},
    })
    .then (res => {return this._checkRes(res)})
  }
}

/*создаем и экспортируем экземпляр класса api для использования в App*/ 
const api = new Api ('https://api.inkinyam.nomoredomains.sbs', {
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api;