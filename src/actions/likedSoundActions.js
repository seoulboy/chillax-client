import { SERVER_URL } from '../constants';

export const FETCH_LIKED_SOUNDS_BEGIN = 'FETCH_LIKED_SOUNDS_BEGIN';
export const FETCH_LIKED_SOUNDS_SUCCESS = 'FETCH_LIKED_SOUNDS_SUCCESS';
export const FETCH_LIKED_SOUNDS_FAILURE = 'FETCH_LIKED_SOUNDS_FAILURE';
export const UNLIKE_SOUND = 'UNLIKE_SOUND';
export const LIKE_SOUND = 'LIKE_SOUND';

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export const fetchLikedSoundsBegin = () => ({
  type: FETCH_LIKED_SOUNDS_BEGIN,
});

export const fetchLikedSoundsSuccess = likedSounds => ({
  type: FETCH_LIKED_SOUNDS_SUCCESS,
  payload: { likedSounds },
});

export const fetchLikedSoundsFailure = error => ({
  type: FETCH_LIKED_SOUNDS_FAILURE,
  payload: { error },
});

export const unlikeSound = sound => ({
  type: UNLIKE_SOUND,
  payload: { sound },
});

export const likeSound = sound => ({
  type: LIKE_SOUND,
  payload: { sound },
});

export const handleLike = (sound, userId) => {
  const url = `${SERVER_URL}/users/${userId}/liked_sounds`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({ soundId: sound._id }),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  return dispatch => {
    return fetch(url, options)
      .then(handleErrors)
      .then(data => {
        dispatch(likeSound(sound));
        return data;
      });
  };
};

export const handleUnlike = (sound, userId) => {
  const url = `${SERVER_URL}/users/${userId}/liked_sounds/${sound._id}`;
  const options = {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  return dispatch => {
    return fetch(url, options)
      .then(handleErrors)
      .then(data => {
        dispatch(unlikeSound(sound));
        console.log(data);
        return data;
      });
  };
};

export const getLikedSounds = userId => {
  const limit = '3';
  const url = `${SERVER_URL}/users/${userId}/liked_sounds?limit=${limit}`;
  const options = {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  };

  return dispatch => {
    dispatch(fetchLikedSoundsBegin());
    return fetch(url, options)
      .then(handleErrors)
      .then(json => {
        dispatch(fetchLikedSoundsSuccess(json.likedSounds));
        return json.likedSounds;
      })
      .catch(error => dispatch(fetchLikedSoundsFailure(error)));
  };
};
