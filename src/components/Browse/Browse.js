import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './Browse.scss';
import {
  getSoundsBrowsePage,
  loadMoreSounds,
} from '../../actions/soundActions';
import { getLikedSounds } from '../../actions/likedSoundActions';
import { getListeningHistory } from '../../actions/listeningHistoryActions';

import LikesAndListenHistory from '../LikesAndListenHistory';
import Modal from '../Modal';
import SoundInfo from '../SoundInfo';
import { updateListeningHistory } from '../../api';
import { Icon } from 'antd';
import { titleCase } from '../../utils';

const Browse = props => {
  const [showSoundModal, setShowSoundModal] = useState(false);
  const [currentlyViewingSound, setCurrentlyViewingSound] = useState(null);

  const mostPopularSoundsContainer = useRef(null);
  const recentlyUploadedSoundsContainer = useRef(null);
  const discoverSoundsContainer = useRef(null);
  const mostListenedSoundsContainer = useRef(null);

  const likedSoundIds = props.user.likedSounds;

  useEffect(() => {
    if (props.user._id) {
      props.getSoundsBrowsePage(props.user._id);
    }
  }, [props.user]);

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

  const isPlayingThisSound = soundUrl => {
    return props.isPlayingSound.some(url => {
      return url == soundUrl;
    });
  };

  const scrollLeftOrRight = (listName, direction) => {
    if (direction === 'right') {
      if (listName === 'most-popular') {
        mostPopularSoundsContainer.current.scrollLeft += 170;
      } else if (listName === 'recent-uploads') {
        recentlyUploadedSoundsContainer.current.scrollLeft += 170;
      } else if (listName === 'most-listened') {
        mostListenedSoundsContainer.current.scrollLeft += 170;
      } else if (listName === 'discover-sounds') {
        discoverSoundsContainer.current.scrollLeft += 170;
      }
    } else {
      if (listName === 'most-popular') {
        mostPopularSoundsContainer.current.scrollLeft -= 170;
      } else if (listName === 'recent-uploads') {
        recentlyUploadedSoundsContainer.current.scrollLeft -= 170;
      } else if (listName === 'most-listened') {
        mostListenedSoundsContainer.current.scrollLeft -= 170;
      } else if (listName === 'discover-sounds') {
        discoverSoundsContainer.current.scrollLeft -= 170;
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
        <p className='list-name-heading'>{titleCase(listName)}</p>
        <div
          className={`browse-sound-container`}
          onScroll={() => {
            var listElm;
            if (listName === 'most-popular') {
              listElm = mostPopularSoundsContainer.current;
            } else if (listName === 'most-listened') {
              listElm = mostListenedSoundsContainer.current;
            } else if (listName === 'discover-sounds') {
              listElm = discoverSoundsContainer.current;
            } else if (listName === 'recent-uploads') {
              listElm = recentlyUploadedSoundsContainer.current;
            }
            if (
              listElm.scrollLeft + listElm.clientWidth >=
              listElm.scrollWidth
            ) {
              props.loadMoreSounds(
                props.user._id,
                undefined,
                listName,
                soundList.length
              );
            }
          }}
          ref={
            listName === 'most-popular'
              ? mostPopularSoundsContainer
              : listName === 'recent-uploads'
              ? recentlyUploadedSoundsContainer
              : listName === 'most-listened'
              ? mostListenedSoundsContainer
              : listName === 'discover-sounds'
              ? discoverSoundsContainer
              : null
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
                  <Icon
                    className='like-button'
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
                  <button
                    className={
                      isPlayingThisSound(sound.url[0].soundUrl)
                        ? 'play-button pause'
                        : 'play-button play'
                    }
                    onClick={() => {
                      if (
                        !props.currentlyPlaying.some(
                          playingSound =>
                            playingSound.url[0].soundUrl ==
                            sound.url[0].soundUrl
                        )
                      ) {
                        updateListeningHistory(sound._id, props.user._id);
                        props.setCurrentlyPlaying(sound);
                      }
                      playOrPauseAudio(sound.url[0].soundUrl);
                    }}
                  ></button>
                </div>
                <p
                  className='sound-title'
                  onClick={() => {
                    setCurrentlyViewingSound(sound);
                    setShowSoundModal(true);
                  }}
                >
                  {sound.title}
                </p>
                <p className='sound-uploader'>{sound.uploader.name}</p>
              </div>
            );
          })}
        </div>
        {renderPrevAndNextButtons(listName)}
      </div>
    );
  };

  return (
    <div className='browse-page-container-backdrop'>
      <div className='browse-page-container'>
        <div id='list-container'>
          {renderMainLists(props.discoverSounds, 'discover-sounds')}
          {renderMainLists(props.mostPopular, 'most-popular')}
          {renderMainLists(props.recentUpload, 'recent-uploads')}
          {renderMainLists(props.mostListened, 'most-listened')}
        </div>
        <LikesAndListenHistory
          user={props.user}
          likedSounds={props.likedSounds}
          listeningHistory={props.listeningHistory}
          getLikedSounds={() => props.getLikedSounds(props.user._id)}
          getListeningHistory={() => props.getListeningHistory(props.user._id)}
          isPlayingThisSound={isPlayingThisSound}
          isPlayingSound={props.isPlayingSound}
          playOrPauseAudio={playOrPauseAudio}
          currentlyPlaying={props.currentlyPlaying}
          updateListeningHistory={updateListeningHistory}
          setCurrentlyPlaying={props.setCurrentlyPlaying}
        />
        {showSoundModal && (
          <Modal
            handleClose={() => setShowSoundModal(false)}
            show={showSoundModal}
          >
            <SoundInfo
              currentlyViewingSound={currentlyViewingSound}
              isPlayingThisSound={isPlayingThisSound}
              isPlayingSound={props.isPlayingSound}
              playOrPauseAudio={playOrPauseAudio}
              currentlyPlaying={props.currentlyPlaying}
              updateListeningHistory={updateListeningHistory}
              setCurrentlyPlaying={props.setCurrentlyPlaying}
              user={props.user}
            />
          </Modal>
        )}
      </div>
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
    discover_sounds,
    most_listened,
  } = state.soundsReducer;
  return {
    isLoading: loading,
    likedSounds: liked_sounds,
    listeningHistory: history,
    recentUpload: recent_upload,
    mostPopular: most_popular,
    discoverSounds: discover_sounds,
    mostListened: most_listened,
  };
};

const mapDispatchToProps = {
  getSoundsBrowsePage,
  getLikedSounds,
  getListeningHistory,
  loadMoreSounds,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
