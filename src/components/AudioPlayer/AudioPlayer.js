import React, { useRef, useEffect } from 'react';

const AudioPlayer = props => {
  const audioElement = useRef(null);

  useEffect(() => {
    if (props.isPlayingSound) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  }, [props.isPlayingSound])
  
  useEffect(() => {
    audioElement.current.volume = props.volume
  }, [props.volume])

  return (
    <div>
      <p>This is Audio Player Component</p>
      <audio
        id='default-audioplayer'
        src='https://rainymood.com/audio1110/0.m4a'
        preload='auto'
        controls
        loop
        ref={audioElement}
      />
    </div>
  );
};

export default AudioPlayer;
