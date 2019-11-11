import React, { useRef, useEffect } from 'react';

const AudioPlayer = props => {
  const audioElement = useRef(null);

  useEffect(() => {
    if (props.isPlayingSound) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  });

  useEffect(() => {
    audioElement.current.volume = props.volume;
  }, [props.volume]);

  return (
    <div>
      <audio
        id='default-audioplayer'
        src={props.currentlyPlaying}
        preload='auto'
        loop
        ref={audioElement}
      />
    </div>
  );
};

export default AudioPlayer;
