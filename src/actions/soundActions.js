export const PLAY_SOUND = 'PLAY_SOUND';
export const PAUSE_SOUND = 'PAUSE_SOUND';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';

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
