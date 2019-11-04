import React, { useState, useEffect, useRef } from 'react';
const axios = require('axios');
require('./Home.scss');

const Home = props => {
  const audioPlayer = useRef(null);

  const [showTodaysMusicPlayer, setShowTodaysMusicPlayer] = useState(false);
  const [todaysMusicTitle, setTodaysMusicTitle] = useState('');
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const todaysMusicVideoId = '7ZguAEoNpZw';

  useEffect(() => {
    const options = {
      url: 'https://www.googleapis.com/youtube/v3/videos',
      method: 'GET',
      params: {
        part: 'snippet',
        id: todaysMusicVideoId,
        fields: 'items(id, snippet)',
        key: 'AIzaSyANZD6saMZJLjPZbXDGTKd72v-knNRElL8',
      },
    };

    axios(options).then(response => {
      setTodaysMusicTitle(response.data.items[0].snippet.title);
    });
  }, []);

  const playAudio = () => {
    if (isPlayingSound) {
      setIsPlayingSound(false);
      audioPlayer.current.pause();
    } else {
      setIsPlayingSound(true);
      audioPlayer.current.play();
    }
  };

  const setVolume = volume => {
    audioPlayer.current.volume = volume;
  };
  
  return (
    <div id='home-container'>
      <div id='default-audioplayer-skin'>
        <button
          id='play-button'
          className={isPlayingSound ? 'main-pause' : 'main-play'}
          onClick={() => playAudio()}
        ></button>
        <input
          id='range-volume'
          type='range'
          onInput={event => setVolume(event.target.value)}
          onChange={event => setVolume(event.target.value)}
          min='0'
          max='1'
          step='0.01'
          defaultValue='1'
        />
      </div>
      <audio
        id='default-audioplayer'
        src='https://rainymood.com/audio1110/0.m4a'
        loop
        ref={audioPlayer}
      ></audio>
      <h1>Chillax</h1>
      <p>Go ahead and take a chill pill for today</p>
      <h3 class='todays-music'>
        {showTodaysMusicPlayer ? (
          <span>
            <button
              onClick={() => {
                setShowTodaysMusicPlayer(false);
              }}
            >
              Chillax
            </button>{' '}
            + {todaysMusicTitle}
          </span>
        ) : (
          <span>
            Today's Music:{' '}
            <button
              onClick={() => {
                setShowTodaysMusicPlayer(true);
              }}
            >
              {todaysMusicTitle}
            </button>
          </span>
        )}
      </h3>

      {showTodaysMusicPlayer && (
        <iframe
          title='todays music'
          src='https://www.youtube.com/embed/-2cHAFq5oKg?autoplay=1'
          width='960'
          height='447'
          frameBorder='0'
          allow='autoplay'
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Home;
