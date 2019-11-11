import React, { useEffect } from 'react';
import './LikesAndListenHistory.scss';
import { Icon } from 'antd';

const LikesAndListenHistory = props => {
  useEffect(() => {
    props.getLikedSounds();
    props.getListeningHistory();
  }, []);

  const renderLikesCard = () => {
    const likedSoundsCard = props.likedSounds.map(sound => {
      return (
        <div className='each-card' key={sound._id}>
          <img src={sound.url[0].thumbnailUrl} alt={sound.title} />
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
    const listeningHistoryCards = props.listeningHistory.map(sound => {
      return (
        <div className='each-card' key={sound._id}>
          <img src={sound.url[0].thumbnailUrl} alt={sound.title} />
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
          {props.user.likedSounds ? props.user.likedSounds.length : 0} likes
          <span>View all</span>
        </div>
        <div className='likes-card-container'>{renderLikesCard()}</div>
      </div>

      <div className='listening-history-container'>
        <div className='listening-history-container'>
          <div className='card-header'>
            <Icon type='calendar' /> Listening History
            <span>View all</span>
          </div>
          <div className='history-card-container'>
            {renderListeningHistoryCard()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikesAndListenHistory;
