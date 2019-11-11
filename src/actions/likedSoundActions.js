import { SERVER_URL } from '../constants';

export const FETCH_LIKED_SOUNDS_BEGIN = 'FETCH_LIKED_SOUNDS_BEGIN';
export const FETCH_LIKED_SOUNDS_SUCCESS = 'FETCH_LIKED_SOUNDS_SUCCESS';
export const FETCH_LIKED_SOUNDS_FAILURE = 'FETCH_LIKED_SOUNDS_FAILURE';

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
