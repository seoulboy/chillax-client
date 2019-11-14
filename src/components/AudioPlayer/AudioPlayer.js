import React, { useRef, useEffect } from 'react';
import './AudioPlayer.scss';

const AudioPlayer = props => {
  console.log(props.isPlayingSound);

  const audioElement = useRef(null);

  useEffect(() => {
    if (props.isPlayingSound.includes(props.currentlyPlaying.url[0].soundUrl)) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  });

  useEffect(() => {
    audioElement.current.volume = props.volume;
  }, [props.volume]);

  return (
    <div className='audio-player'>
      <audio
        id='default-audioplayer'
        src={
          props.currentlyPlaying ? props.currentlyPlaying.url[0].soundUrl : ''
        }
        preload='auto'
        loop
        ref={audioElement}
      />
    </div>
  );
};

export default AudioPlayer;
