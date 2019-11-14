import React from 'react';
import './SoundBoard.scss';
import { Icon } from 'antd';
import { updateListeningHistory } from '../../api';

const SoundBoard = props => {
  const likedSoundIds = props.user.likedSounds;

  const isPlayingThisSound = soundUrl => {
    return props.isPlayingSound.some(url => {
      return url == soundUrl;
    });
  };

  const playOrPauseAudio = soundUrl => {
    const thisSoundPlaying = props.isPlayingSound.some(url => {
      return url == soundUrl;
    });

    if (thisSoundPlaying) {
      props.pauseSound(soundUrl);
    } else {
      props.playSound(soundUrl);
    }
  };

  const renderSoundcards = () => {
    return props.currentlyPlaying.map(sound => {
      return (
        <div className='soundboard-card' key={sound._id}>
          <div className='soundboard-image-container'>
            <img src={sound.url[0].thumbnailUrl} alt={sound.title} />
            <button
              className={
                isPlayingThisSound(sound.url[0].soundUrl)
                  ? 'play-button pause'
                  : 'play-button play'
              }
              onClick={() => {
                playOrPauseAudio(sound.url[0].soundUrl);
                updateListeningHistory(sound._id, props.user._id);
                props.setCurrentlyPlaying(sound);
              }}
            ></button>
          </div>
          <div className='soundboard-card-detail'>
            {sound.title != 'rainymood.com' && (
              <Icon
                className='soundboard-like-button'
                type='heart'
                onClick={e => {
                  if (!likedSoundIds.includes(sound._id)) {
                    props.handleLike(sound, props.user._id);
                  } else if (likedSoundIds.includes(sound._id)) {
                    props.handleUnlike(sound, props.user._id);
                  }
                }}
                theme={(() => {
                  if (likedSoundIds.includes(sound._id)) {
                    return 'filled';
                  } else {
                    return 'outlined';
                  }
                })()}
              />
            )}
            <div>
              <p className='soundboard-card-title'>{sound.title}</p>
              {/* <p className='soundboard-card-uploader'>{sound.uploader.name}</p> */}
            </div>
            <Icon
              className='soundboard-close-card'
              type='close-circle'
              theme='filled'
              onClick={() => props.deleteCurrentlyPlaying(sound)}
            />
          </div>
        </div>
      );
    });
  };
  return (
    <div className='soundboard-container'>
      <div className='soundboard-inner-container'>{renderSoundcards()}</div>
    </div>
  );
};

export default SoundBoard;
