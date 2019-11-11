import { SERVER_URL } from '../constants';

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export const updateListeningHistory = (soundId, userId) => {
  const url = `${SERVER_URL}/users/${userId}/listening_history`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({ soundId }),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };

  fetch(url, options)
    .then(handleErrors)
    .then(data => {
      return data
    });
};

export const updateLiked = (soundId, userId) => {
  const url = `${SERVER_URL}/users/${userId}/liked`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({ soundId }),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };

  fetch(url, options)
    .then(handleErrors)
    .then(data => {
      return data
    });
}
