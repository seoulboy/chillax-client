import { SERVER_URL } from '../constants';

export const PLAY_SOUND = 'PLAY_SOUND';
export const PAUSE_SOUND = 'PAUSE_SOUND';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const SET_CURRENTLY_PLAYING = 'SET_CURRENTLY_PLAYING';
export const DELETE_CURRENTLY_PLAYING = 'DELETE_CURRENTLY_PLAYING';
export const UPLOAD_SOUND_SUCCESS = 'UPLOAD_SOUND_SUCCESS';
export const LOAD_MORE_SOUNDS_SUCCESS = 'LOAD_MORE_SOUNDS_SUCCESS';

export const FETCH_SOUNDS_BROWSE_BEGIN = 'FETCH_SOUNDS_BROWSE_BEGIN';
export const FETCH_SOUNDS_BROWSE_SUCCESS = 'FETCH_SOUNDS_BROWSE_SUCCESS';
export const FETCH_SOUNDS_BROWSE_FAILURE = 'FETCH_SOUNDS_BROWSE_FAILURE';

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export const playSound = url => ({
  type: PLAY_SOUND,
  payload: { url },
});

export const pauseSound = url => ({
  type: PAUSE_SOUND,
  payload: { url },
});

export const changeVolume = volume => ({
  type: CHANGE_VOLUME,
  payload: {
    volume,
  },
});

export const getSoundsBrowseBegin = () => ({
  type: FETCH_SOUNDS_BROWSE_BEGIN,
});

export const getSoundsBrowseSuccess = sounds => ({
  type: FETCH_SOUNDS_BROWSE_SUCCESS,
  payload: { ...sounds },
});

export const getSoundsBrowseFailure = error => ({
  type: FETCH_SOUNDS_BROWSE_FAILURE,
  payload: { error },
});

export const loadMoreSoundsSuccess = (sounds, loadItem) => ({
  type: LOAD_MORE_SOUNDS_SUCCESS,
  payload: { sounds, loadItem },
});

export const loadMoreSounds = (userId, type = '', loadItem, currentIndex) => {
  const url = new URL(`${SERVER_URL}/users/${userId}/sounds/`);
  const params = {
    type: type,
    load_item: loadItem.split('-').join('_'),
    current_index: currentIndex,
  };

  url.search = new URLSearchParams(params).toString();

  const options = {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    },
  };

  return dispatch => {
    return fetch(url, options)
      .then(handleErrors)
      .then(res => {
        dispatch(loadMoreSoundsSuccess(res, loadItem));
      })
      .catch(error => console.error(error));
  };
};

export const getSoundsBrowsePage = (userId, type = '') => {
  const url = new URL(`${SERVER_URL}/users/${userId}/sounds/`);
  const params = {
    type: type,
    recent_upload: 'true',
    most_popular: 'true',
    most_listened: 'true',
    discover_sounds: 'true',
  };

  url.search = new URLSearchParams(params).toString();

  return dispatch => {
    dispatch(getSoundsBrowseBegin());
    return fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then(handleErrors)
      .then(res => {
        dispatch(getSoundsBrowseSuccess(res));
        return res;
      })
      .catch(error => dispatch(getSoundsBrowseFailure(error)));
  };
};

export const setCurrentlyPlaying = sound => ({
  type: SET_CURRENTLY_PLAYING,
  payload: {
    sound,
  },
});

export const deleteCurrentlyPlaying = sound => ({
  type: DELETE_CURRENTLY_PLAYING,
  payload: {
    sound,
  },
});

export const uploadSoundSuccess = data => ({
  type: UPLOAD_SOUND_SUCCESS,
  payload: {
    data,
  },
});

export const uploadSound = (formData, userId) => {
  const url = `${SERVER_URL}/sounds/${userId}`;
  const options = {
    method: 'POST',
    body: formData,
    credentials: 'include',
  };
  return dispatch => {
    return fetch(url, options)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        // dispatch(uploadSoundSuccess(data));
      });
  };
};
