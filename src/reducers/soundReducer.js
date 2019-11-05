import {
  PLAY_SOUND,
  PAUSE_SOUND,
  CHANGE_VOLUME,
} from '../actions/soundActions';

const initalState = {
  isPlayingSound: false,
  volume : 1,
};

const soundReducer = (state = initalState, action) => {
  switch (action.type) {
    case PLAY_SOUND:
      return {
        ...state,
        isPlayingSound: true,
      };
    case PAUSE_SOUND:
      return {
        ...state,
        isPlayingSound: false,
      };
    case CHANGE_VOLUME:
      return {
        ...state,
        volume: action.payload.volume,
      };
    default:
      return state;
  }
};

export default soundReducer;
