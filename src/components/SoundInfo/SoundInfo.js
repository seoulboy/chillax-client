import React, { useState, useRef, useEffect } from 'react';
import './SoundInfo.scss';
// import { usePalette } from 'react-palette';
import { Icon } from 'antd';
import moment from 'moment';

const SoundInfo = props => {
  console.log(props.currentlyViewingSound);

  const formatUploadDate = date => {
    const momentDate = moment(date);
    return momentDate
      .format('MMM-Do-YYYY')
      .split('-')
      .join(' ');
  };

  return (
    <div className='soundinfo-container'>
      <div className='soundinfo-data-container'>
        <div className='soundinfo-header'>
          <button
            className={
              props.isPlayingThisSound(
                props.currentlyViewingSound.url[0].soundUrl
              ) && props.isPlayingSound
                ? 'play-button pause'
                : 'play-button play'
            }
            onClick={() => {
              if (
                !props.currentlyPlaying.some(
                  playingSound =>
                    playingSound.url[0].soundUrl ==
                    props.currentlyViewingSound.url[0].soundUrl
                )
              ) {
                props.updateListeningHistory(props.currentlyViewingSound._id, props.user._id);
                props.setCurrentlyPlaying(props.currentlyViewingSound);
              }
              props.playOrPauseAudio(props.currentlyViewingSound.url[0].soundUrl);
            }}
          ></button>
          <div>
            <p className='soundinfo-upload-date'>
              {formatUploadDate(props.currentlyViewingSound.uploadDate)}
            </p>
            <p className='soundinfo-uploader'>
              {props.currentlyViewingSound.uploader.name}
            </p>
            <p className='soundinfo-type'>
              #{props.currentlyViewingSound.type}
            </p>
            <p className='soundinfo-title'>
              {props.currentlyViewingSound.title}
            </p>
          </div>
        </div>
        <p className='soundinfo-times-played'>
          <Icon type='caret-right' /> {props.currentlyViewingSound.times_played}
        </p>
        <p className='soundinfo-likes'>
          <Icon type='heart' theme='filled' />{' '}
          {props.currentlyViewingSound.likedBy.length}
        </p>
        <p className='soundinfo-description'>
          {props.currentlyViewingSound.description}
        </p>
      </div>
      <div className='soundinfo-image-container'>
        <img
          src={props.currentlyViewingSound.url[0].thumbnailUrl}
          alt={props.currentlyViewingSound.title}
        />
      </div>
    </div>
  );
};

export default SoundInfo;
