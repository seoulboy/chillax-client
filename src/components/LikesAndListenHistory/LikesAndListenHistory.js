import React, { useState, useEffect } from 'react';
import './LikesAndListenHistory.scss';
import Modal from '../Modal';
import ViewAll from '../ViewAll';
import { Icon } from 'antd';
import { OmitProps } from 'antd/lib/transfer/renderListBody';

const LikesAndListenHistory = ({
  getLikedSounds,
  getListeningHistory,
  likedSounds,
  listeningHistory,
  user,
  isPlayingThisSound,
  isPlayingSound,
  playOrPauseAudio,
  currentlyPlaying,
  updateListeningHistory,
  setCurrentlyPlaying,
}) => {
  const [showLikedOrHistoryModal, setShowLikedOrHistoryModal] = useState(false);
  const [viewingAll, setViewingAll] = useState('');

  useEffect(() => {
    getLikedSounds();
    getListeningHistory();
  }, [user.likedSounds]);

  const renderLikesCard = () => {
    const likedSoundsCard = likedSounds.map(sound => {
      return (
        <div className='each-card' key={sound._id}>
          <img src={sound.url[0].thumbnailUrl} alt={sound.title} />
          <button
            className={
              isPlayingThisSound(sound.url[0].soundUrl) && isPlayingSound
                ? 'play-button pause'
                : 'play-button play'
            }
            onClick={() => {
              playOrPauseAudio(sound.url[0].soundUrl);
              if (currentlyPlaying !== sound.url[0].soundUrl) {
                updateListeningHistory(sound._id, user._id);
                setCurrentlyPlaying(sound.url[0].soundUrl);
              }
            }}
          ></button>
          <div className='card-info'>
            <p className='likes-uploader'>{sound.uploader.name}</p>
            <p className='likes-title'>{sound.title}</p>
            <p>
              <Icon type='caret-right' /> {sound.times_played}{' '}
              <Icon type='heart' theme='filled' /> {sound.likedBy.length}{' '}
              <Icon type='message' theme='filled' /> {sound.commentedBy.length}
            </p>
          </div>
        </div>
      );
    });
    return likedSoundsCard;
  };

  const renderListeningHistoryCard = () => {
    const listeningHistoryCards = listeningHistory.map(sound => {
      return (
        <div className='each-card' key={sound._id}>
          <img src={sound.url[0].thumbnailUrl} alt={sound.title} />
          <button
            className={
              isPlayingThisSound(sound.url[0].soundUrl) && isPlayingSound
                ? 'play-button pause'
                : 'play-button play'
            }
            onClick={() => {
              playOrPauseAudio(sound.url[0].soundUrl);
              if (currentlyPlaying !== sound.url[0].soundUrl) {
                updateListeningHistory(sound._id, user._id);
                setCurrentlyPlaying(sound.url[0].soundUrl);
              }
            }}
          ></button>
          <div className='card-info'>
            <p className='history-uploader'>{sound.uploader.name}</p>
            <p className='history-title'>{sound.title}</p>
            <p>
              <Icon type='caret-right' /> {sound.times_played}{' '}
              <Icon type='heart' theme='filled' /> {sound.likedBy.length}{' '}
              <Icon type='message' theme='filled' /> {sound.commentedBy.length}
            </p>
          </div>
        </div>
      );
    });

    return listeningHistoryCards;
  };
  return (
    <div id='likes-and-listen-history-container'>
      <div className='likes-container'>
        <div className='card-header'>
          <Icon type='heart' theme='filled' />{' '}
          {user.likedSounds ? user.likedSounds.length : 0} likes
          <span
            onClick={() => {
              setShowLikedOrHistoryModal(true);
              setViewingAll('like');
            }}
          >
            View all
          </span>
        </div>
        <div className='likes-card-container'>{renderLikesCard()}</div>
      </div>

      <div className='listening-history-container'>
        <div className='listening-history-container'>
          <div className='card-header'>
            <Icon type='calendar' /> Listening History
            <span
              onClick={() => {
                setShowLikedOrHistoryModal(true);
                setViewingAll('history');
              }}
            >
              View all
            </span>
          </div>
          <div className='history-card-container'>
            {renderListeningHistoryCard()}
          </div>
        </div>
      </div>
      {showLikedOrHistoryModal && (
        <Modal
          handleClose={() => setShowLikedOrHistoryModal(false)}
          show={showLikedOrHistoryModal}
        >
          {
            <ViewAll
              user={user}
              viewingAll={viewingAll}
              isPlayingThisSound={isPlayingThisSound}
              isPlayingSound={isPlayingSound}
              playOrPauseAudio={playOrPauseAudio}
              currentlyPlaying={currentlyPlaying}
              updateListeningHistory={updateListeningHistory}
              setCurrentlyPlaying={setCurrentlyPlaying}
            />
          }
        </Modal>
      )}
    </div>
  );
};

export default LikesAndListenHistory;
