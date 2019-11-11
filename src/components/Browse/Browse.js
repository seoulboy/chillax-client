import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './Browse.scss';
import { getSoundsBrowsePage } from '../../actions/soundActions';
import { getLikedSounds } from '../../actions/likedSoundActions';
import { getListeningHistory } from '../../actions/listeningHistoryActions';

import LikesAndListenHistory from '../LikesAndListenHistory';
import { updateListeningHistory } from '../../api';
import { Icon } from 'antd';
import { titleCase } from '../../utils';

const Browse = props => {
  console.log(props);
  const [soundPlayedJustBefore, setSoundPlayedJustBefore] = useState('');
  const mostPopularSoundsContainer = useRef(null);
  const recentlyUploadedSoundsContainer = useRef(null);
  const headerNavList = ['All', 'Sounds', 'Soundscapes'];

  const renderHeaderButtons = headerNavList.map(item => {
    return <li key={item}>{item}</li>;
  });

  const playOrPauseAudio = soundUrl => {
    if (props.isPlayingSound) {
      if (soundPlayedJustBefore === soundUrl) {
        props.pauseSound();
      } else {
        setSoundPlayedJustBefore(soundUrl);
      }
    } else {
      setSoundPlayedJustBefore(soundUrl);
      props.playSound();
    }
  };

  const isPlayingThisSound = soundUrl => {
    return props.currentlyPlaying === soundUrl;
  };

  const scrollLeftOrRight = (listName, direction) => {
    if (direction === 'right') {
      if (listName === 'most-popular') {
        mostPopularSoundsContainer.current.scrollLeft += 170;
      } else {
        recentlyUploadedSoundsContainer.current.scrollLeft += 170;
      }
    } else {
      if (listName === 'most-popular') {
        mostPopularSoundsContainer.current.scrollLeft -= 170;
      } else {
        recentlyUploadedSoundsContainer.current.scrollLeft -= 170;
      }
    }
  };

  const renderPrevAndNextButtons = listName => {
    return (
      <>
        <Icon
          className='button-prev button'
          type='left'
          onClick={e => {
            e.preventDefault();
            scrollLeftOrRight(listName, 'left');
          }}
        />
        <Icon
          className='button-next button'
          type='right'
          onClick={e => {
            e.preventDefault();
            scrollLeftOrRight(listName, 'right');
          }}
        />
      </>
    );
  };

  const renderMainLists = (soundList, listName) => {
    return (
      <div id={listName}>
        {renderPrevAndNextButtons(listName)}
        <p className='list-name-heading'>{titleCase(listName)}</p>
        <div
          className={`browse-sound-container`}
          ref={
            listName === 'most-popular'
              ? mostPopularSoundsContainer
              : recentlyUploadedSoundsContainer
          }
        >
          {soundList.map(sound => {
            return (
              <div className='sound-item' key={sound._id}>
                <div className='thumbnail-container'>
                  <img
                    className='sound-thumbnail'
                    src={sound.url[0].thumbnailUrl}
                    alt={sound.title}
                  />
                  <button
                    className={
                      isPlayingThisSound(sound.url[0].soundUrl) &&
                      props.isPlayingSound
                        ? 'play-button pause'
                        : 'play-button play'
                    }
                    onClick={() => {
                      playOrPauseAudio(sound.url[0].soundUrl);
                      updateListeningHistory(sound._id, props.user._id);
                      props.setCurrentlyPlaying(sound.url[0].soundUrl);
                    }}
                  ></button>
                </div>
                <p className='sound-title'>{sound.title}</p>
                <p className='sound-uploader'>{sound.uploader.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (props.user._id) {
      props.getSoundsBrowsePage(props.user._id);
    }
  }, [props.user]);

  return (
    <div className='browse-page-container'>
      <div className='browse-page-header'>
        <ul>{renderHeaderButtons}</ul>
      </div>

      <div id='list-container'>
        {renderMainLists(props.mostPopular, 'most-popular')}
        {renderMainLists(props.recentUpload, 'recent-uploads')}
      </div>
      <LikesAndListenHistory
        user={props.user}
        likedSounds={props.likedSounds}
        listeningHistory={props.listeningHistory}
        getLikedSounds={() => props.getLikedSounds(props.user._id)}
        getListeningHistory={() => props.getListeningHistory(props.user._id)}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const {
    loading,
    liked_sounds,
    history,
    recent_upload,
    most_popular,
    recommendation,
  } = state.soundsReducer;
  return {
    isLoading: loading,
    likedSounds: liked_sounds,
    listeningHistory: history,
    recentUpload: recent_upload,
    mostPopular: most_popular,
    recommendation: recommendation,
  };
};

const mapDispatchToProps = {
  getSoundsBrowsePage,
  getLikedSounds,
  getListeningHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
