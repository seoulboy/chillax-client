import {
  PLAY_SOUND,
  PAUSE_SOUND,
  CHANGE_VOLUME,
  SET_CURRENTLY_PLAYING,
  DELETE_CURRENTLY_PLAYING,
} from '../actions/soundActions';

const initalState = {
  isPlayingSound: [],
  volume: 1,
  currentlyPlaying: [],
};

const playerReducer = (state = initalState, action) => {
  switch (action.type) {
    case PLAY_SOUND:
      console.log('play sound action called');
      return {
        ...state,
        isPlayingSound: state.isPlayingSound.concat(action.payload.url),
      };
    case PAUSE_SOUND:
      console.log('pause sound action called');
      return {
        ...state,
        isPlayingSound: state.isPlayingSound.filter(
          url => url != action.payload.url
        ),
      };
    case CHANGE_VOLUME:
      return {
        ...state,
        volume: action.payload.volume,
      };
    case SET_CURRENTLY_PLAYING:
      const isInPlaylist = state.currentlyPlaying.some(sound => {
        return sound.url[0].soundUrl == action.payload.sound.url[0].soundUrl;
      });
      if (isInPlaylist) {
        return {
          ...state,
        };
      } else if (!isInPlaylist) {
        return {
          ...state,
          currentlyPlaying: state.currentlyPlaying.concat(action.payload.sound),
        };
      }
      return {
        ...state,
        currentlyPlaying: state.currentlyPlaying
          .filter(sound => {
            return sound.url[0].soundUrl != action.payload.sound.url;
          })
          .concat(action.payload.sound),
      };
    case DELETE_CURRENTLY_PLAYING:
      console.log('delete currently playing reducer activated');
      const filteredPlaylist = state.currentlyPlaying.filter(sound => {
        return sound.url[0].soundUrl != action.payload.sound.url[0].soundUrl;
      });
      const filteredIsPlayingList = state.isPlayingSound.filter(
        existingSoundUrl => {
          return existingSoundUrl != action.payload.sound.url[0].soundUrl;
        }
      );
      return {
        ...state,
        currentlyPlaying: filteredPlaylist,
        isPlayingSound: filteredIsPlayingList,
      };
    default:
      return state;
  }
};

export default playerReducer;
