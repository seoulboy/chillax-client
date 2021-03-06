import React, { useEffect, useState } from 'react';
import { getAllLiked, getAllHistory } from '../../api';
import { Icon } from 'antd';
import './ViewAll.scss';

const ViewAll = ({
  user,
  viewingAll,
  isPlayingThisSound,
  playOrPauseAudio,
  currentlyPlaying,
  updateListeningHistory,
  setCurrentlyPlaying,
}) => {
  const [sounds, setSounds] = useState(null);
  const [selectedSound, setSelectedSound] = useState('');
  console.log(sounds);
  useEffect(() => {
    const fetchLikedSoundsOrHistory = async () => {
      if (viewingAll === 'like') {
        getAllLiked(user._id).then(data => setSounds(data.likedSounds));
      } else if (viewingAll === 'history') {
        getAllHistory(user._id).then(data => setSounds(data.listeningHistory));
      }
    };

    fetchLikedSoundsOrHistory();
  }, []);

  const renderViewAll = () => {
    if (sounds === null) {
      return 'loading...';
    } else if (sounds.length) {
      return sounds.map(sound => {
        return (
          <div
            className='viewall-cards'
            key={sound._id}
            onClick={() => {
              setSelectedSound(sound);
              playOrPauseAudio(sound.url[0].soundUrl);
              updateListeningHistory(sound._id, user._id);
              setCurrentlyPlaying(sound);
            }}
          >
            <span className='viewall-uploader'>{sound.uploader.name}</span>
            <span className='viewall-dash'>-</span>
            <span className='viewall-title'>{sound.title}</span>
            <span className='viewall-timesplayed'>
              {' '}
              <Icon type='caret-right' /> {sound.times_played}
            </span>
          </div>
        );
      });
    } else if (sounds.length === 0) {
      return 'There are no sounds to show! Listen or like sounds first!';
    }
  };

  return (
    <div className='viewall-container'>
      <div className='viewall-img-container'>
        <img
          className='viewall-img'
          src={selectedSound ? selectedSound.url[0].thumbnailUrl : '//:0'}
          alt=''
        />
        {selectedSound && (
          <button
            className={
              isPlayingThisSound(selectedSound.url[0].soundUrl)
                ? 'play-button pause'
                : 'play-button play'
            }
            onClick={() => {
              if (
                !currentlyPlaying.some(
                  playingSound =>
                    playingSound.url[0].soundUrl ==
                    selectedSound.url[0].soundUrl
                )
              ) {
                updateListeningHistory(selectedSound._id, user._id);
                setCurrentlyPlaying(selectedSound);
              }
              playOrPauseAudio(selectedSound.url[0].soundUrl);
            }}
          ></button>
        )}
      </div>
      <div className='viewall-cards-container'>{renderViewAll()}</div>
    </div>
  );
};

export default ViewAll;
