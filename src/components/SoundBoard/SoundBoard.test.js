import React from 'react';
import { mount, shallow } from 'enzyme';
import SoundBoard from './SoundBoard';

describe('<SoundBoard />', () => {
  let component = null;
  const props = {
    user: { likedSounds: [] },
    currentlyPlaying: [],
  };
  it('renders correctly', () => {
    component = shallow(<SoundBoard {...props} />);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders 0 sound cards', () => {
    const props = {
      user: { likedSounds: [] },
      currentlyPlaying: [],
      isPlayingSound: [],
    };
    const SoundBoardCards = shallow(<SoundBoard {...props} />).find(
      '.soundboard-card'
    );
    
    expect(SoundBoardCards).toHaveLength(0);
  });

  it('renders correct number of sound cards', () => {
    const props = {
      user: { likedSounds: [] },
      currentlyPlaying: [{ url: [{ thumbnailUrl: 'aaa' }], _id: '0' }],
      isPlayingSound: [],
    };
    const SoundBoardCards = shallow(<SoundBoard {...props} />).find(
      '.soundboard-card'
    );

    expect(SoundBoardCards).toHaveLength(1);
  });

  it('check if button displays correctly on play', () => {
    const props = {
      user: { likedSounds: [] },
      currentlyPlaying: [
        { url: [{ soundUrl: 'abc', thumbnailUrl: 'aaa' }], _id: '0' },
      ],
      isPlayingSound: ['abc'],
    };
    const SoundBoardButton = shallow(<SoundBoard {...props} />).find(
      '.play-button'
    );

    expect(SoundBoardButton.hasClass('pause')).toEqual(true);
    expect(SoundBoardButton.hasClass('play')).toEqual(false);
  });

  it('check if button displays correctly on pause', () => {
    const props = {
      user: { likedSounds: [] },
      currentlyPlaying: [
        { url: [{ soundUrl: 'abc', thumbnailUrl: 'aaa' }], _id: '0' },
      ],
      isPlayingSound: [],
    };
    const SoundBoardButton = shallow(<SoundBoard {...props} />).find(
      '.play-button'
    );
    expect(SoundBoardButton.hasClass('play')).toEqual(true);
    expect(SoundBoardButton.hasClass('pause')).toEqual(false);
  });

  it('check if button click on playing pauses sound', () => {
    const playSound = jest.fn();
    const pauseSound = jest.fn();
    const setCurrentlyPlaying = jest.fn();
    const props = {
      user: { likedSounds: [] },
      currentlyPlaying: [
        { url: [{ soundUrl: 'abc', thumbnailUrl: 'aaa' }], _id: '0' },
      ],
      isPlayingSound: ['abc'],
      playSound,
      pauseSound,
      setCurrentlyPlaying,
    };
    const SoundBoardButton = shallow(<SoundBoard {...props} />).find(
      '.play-button'
    );
    SoundBoardButton.simulate('click');
    expect(pauseSound).toHaveBeenCalled();
    expect(playSound).not.toHaveBeenCalled();
  });

  it('check if button click on pause plays sound', () => {
    const playSound = jest.fn();
    const pauseSound = jest.fn();
    const setCurrentlyPlaying = jest.fn();
    const props = {
      user: { likedSounds: [] },
      currentlyPlaying: [
        { url: [{ soundUrl: 'abc', thumbnailUrl: 'aaa' }], _id: '0' },
      ],
      isPlayingSound: ['cba'],
      playSound,
      pauseSound,
      setCurrentlyPlaying,
    };
    const SoundBoardButton = shallow(<SoundBoard {...props} />).find(
      '.play-button'
    );
    SoundBoardButton.simulate('click');
    expect(playSound).toHaveBeenCalled();
    expect(pauseSound).not.toHaveBeenCalled();
  });

  it('check if like button calls handleLike correctly', () => {
    const handleLike = jest.fn();
    const handleUnlike = jest.fn();
    const props = {
      user: { likedSounds: ['notTheSameId'] },
      currentlyPlaying: [
        { url: [{ soundUrl: 'abc', thumbnailUrl: 'aaa' }], _id: 'soundId' },
      ],
      isPlayingSound: [],
      handleLike,
      handleUnlike,
    };

    const SoundBoardLikeButton = shallow(<SoundBoard {...props} />).find(
      '.soundboard-like-button'
    );

    SoundBoardLikeButton.simulate('click');
    expect(handleLike).toHaveBeenCalled();
    expect(handleUnlike).not.toHaveBeenCalled();
  });

  it('check if like button calls handleUnlike correctly', () => {
    const handleLike = jest.fn();
    const handleUnlike = jest.fn();
    const props = {
      user: { likedSounds: ['soundId'] },
      currentlyPlaying: [
        { url: [{ soundUrl: 'abc', thumbnailUrl: 'aaa' }], _id: 'soundId' },
      ],
      isPlayingSound: [],
      handleLike,
      handleUnlike,
    };
    const SoundBoardLikeButton = shallow(<SoundBoard {...props} />).find(
      '.soundboard-like-button'
    );

    SoundBoardLikeButton.simulate('click');
    expect(handleUnlike).toHaveBeenCalled();
    expect(handleLike).not.toHaveBeenCalled();
  });

  it('check if close button calls deleteCurrentlyPlaying correctly', () => {
    const deleteCurrentlyPlaying = jest.fn();
    const props = {
      user: { likedSounds: ['soundId'] },
      currentlyPlaying: [
        { url: [{ soundUrl: 'abc', thumbnailUrl: 'aaa' }], _id: 'soundId' },
      ],
      isPlayingSound: [],
      deleteCurrentlyPlaying,
    };
    const SoundBoardCloseCardButton = shallow(<SoundBoard {...props} />).find(
      '.soundboard-close-card'
    );

    SoundBoardCloseCardButton.simulate('click');
    expect(deleteCurrentlyPlaying).toHaveBeenCalled();
  });
});
