import {
  FETCH_SOUNDS_BROWSE_BEGIN,
  FETCH_SOUNDS_BROWSE_SUCCESS,
  FETCH_SOUNDS_BROWSE_FAILURE,
  UPLOAD_SOUND_SUCCESS,
} from '../actions/soundActions';

import {
  FETCH_LIKED_SOUNDS_SUCCESS,
  // UNLIKE_SOUND,
  // LIKE_SOUND,
} from '../actions/likedSoundActions';

import { FETCH_LISTENING_HISTORY_SUCCESS } from '../actions/listeningHistoryActions';

const initialState = {
  loading: false,
  error: null,
  liked_sounds: [],
  history: [],
  recent_upload: [],
  most_popular: [],
  most_listened: [],
  discover_sounds: [],
};

const soundsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SOUNDS_BROWSE_BEGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_SOUNDS_BROWSE_SUCCESS: {
      return {
        ...state,
        loading: false,
        recent_upload: action.payload.recent_upload,
        most_popular: action.payload.most_popular,
        most_listened: action.payload.most_listened,
        discover_sounds: action.payload.discover_sounds,
      };
    }
    case FETCH_SOUNDS_BROWSE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case UPLOAD_SOUND_SUCCESS: {
      return { ...state };
    }
    case FETCH_LIKED_SOUNDS_SUCCESS: {
      return { ...state, liked_sounds: action.payload.likedSounds };
    }
    case FETCH_LISTENING_HISTORY_SUCCESS: {
      // console.log('aciton', action.payload)
      return { ...state, history: action.payload.listeningHistory };
    }
    default:
      return state;
  }
};

export default soundsReducer;
