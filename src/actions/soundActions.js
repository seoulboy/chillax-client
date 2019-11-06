import { SERVER_URL } from '../constants';

const axios = require('axios');

export const PLAY_SOUND = 'PLAY_SOUND';
export const PAUSE_SOUND = 'PAUSE_SOUND';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const SET_CURRENTLY_PLAYING = 'SET_CURRENTLY_PLAYING';
export const UPLOAD_SOUND_SUCCESS = 'UPLOAD_SOUND_SUCCESS';

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export const playSound = () => ({
  type: PLAY_SOUND,
});

export const pauseSound = () => ({
  type: PAUSE_SOUND,
});

export const changeVolume = volume => ({
  type: CHANGE_VOLUME,
  payload: {
    volume,
  },
});

export const setCurrentlyPlaying = url => ({
  type: SET_CURRENTLY_PLAYING,
  payload: {
    url,
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
