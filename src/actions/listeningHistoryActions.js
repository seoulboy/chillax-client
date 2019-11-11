import { SERVER_URL } from '../constants';
import { fetchLikedSoundsSuccess } from './likedSoundActions';

export const FETCH_LISTENING_HISTORY_SUCCESS =
  'FETCH_LISTENING_HISTORY_SUCCESS';
export const FETCH_LISTENING_HISTORY_BEGIN = 'FETCH_LISTENING_HISTORY_BEGIN';
export const FETCH_LISTENING_HISTORY_FAILURE =
  'FETCH_LISTENING_HISTORY_FAILURE';

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export const fetchListeningHistoryBegin = () => ({
  type: FETCH_LISTENING_HISTORY_BEGIN,
});

export const fetchListeningHistorySuccess = listeningHistory => ({
  type: FETCH_LISTENING_HISTORY_SUCCESS,
  payload: { listeningHistory },
});

export const fetchListeningHistoryFailure = error => ({
  type: FETCH_LISTENING_HISTORY_FAILURE,
  payload: { error },
});

export const getListeningHistory = userId => {
  const limit = '3';
  const url = `${SERVER_URL}/users/${userId}/listening_history?limit=${limit}`;
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
    dispatch(fetchListeningHistoryBegin());
    return fetch(url, options)
      .then(handleErrors)
      .then(json => {
        dispatch(fetchListeningHistorySuccess(json.listeningHistory));
        return json.listeningHistory;
      })
      .catch(error => dispatch(fetchListeningHistoryFailure(error)));
  };
};
