const baseUrl = "http://api.mesto.polina.students.nomoredomains.club";

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const register = ({password, email}) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export const authorize = ({password, email}) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export const getContent = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `${token}`
    }
  })
  .then(checkResponse)
};