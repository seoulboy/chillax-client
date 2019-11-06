import React, { useRef, useEffect } from 'react';

const AudioPlayer = props => {
  const audioElement = useRef(null);

  useEffect(() => {
    if (props.isPlayingSound) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  }, [props.isPlayingSound]);

  useEffect(() => {
    audioElement.current.volume = props.volume;
  }, [props.volume]);

  return (
    <div>
      <audio
        id='default-audioplayer'
        src='https://rainymood.com/audio1110/0.m4a'
        preload='auto'
        loop
        ref={audioElement}
      />
    </div>
  );
};

export default AudioPlayer;
