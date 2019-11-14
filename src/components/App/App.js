import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import Home from '../Home';
import Browse from '../Browse';
import SoundBoard from '../SoundBoard';
import Modal from '../Modal';
import UploadForm from '../UploadForm';
import AudioPlayer from '../AudioPlayer';
import {
  playSound,
  pauseSound,
  changeVolume,
  uploadSound,
  setCurrentlyPlaying,
  deleteCurrentlyPlaying,
} from '../../actions/soundActions';
import { handleUnlike, handleLike } from '../../actions/likedSoundActions';

const App = props => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const renderAudioPlayers = () => {
    return props.currentlyPlaying.map(sound => {
      return (
        <AudioPlayer
          key={sound._id}
          isPlayingSound={props.isPlayingSound}
          volume={props.volume}
          currentlyPlaying={sound}
          isPlayingSound={props.isPlayingSound}
        />
      );
    });
  };

  return (
    <Router>
      <Navbar displayUploadModal={() => setShowUploadModal(true)} />
      <Switch>
        <Redirect exact from='/' to='/home' />
        <Route
          path='/home'
          render={() => (
            <Home
              isPlayingSound={props.isPlayingSound}
              playSound={props.playSound}
              pauseSound={props.pauseSound}
              changeVolume={props.changeVolume}
              setCurrentlyPlaying={props.setCurrentlyPlaying}
            />
          )}
        />
        {!props.isAuthenticated && <Redirect from='/browse' to='/home' />}
        <Route
          path='/browse'
          render={() => (
            <Browse
              user={props.user}
              isPlayingSound={props.isPlayingSound}
              playSound={props.playSound}
              pauseSound={props.pauseSound}
              changeVolume={props.changeVolume}
              setCurrentlyPlaying={props.setCurrentlyPlaying}
              currentlyPlaying={props.currentlyPlaying}
              handleLike={props.handleLike}
              handleUnlike={props.handleUnlike}
            />
          )}
        />
        <Route path='/*' component={() => <h1>Not Found</h1>} />
      </Switch>
      {showUploadModal && (
        <Modal
          handleClose={() => setShowUploadModal(false)}
          show={showUploadModal}
        >
          <UploadForm
            handleClose={() => setShowUploadModal(false)}
            showUploadModal={() => setShowUploadModal(true)}
            uploadSound={props.uploadSound}
            user={props.user}
          />
        </Modal>
      )}
      {props.user.likedSounds && <SoundBoard
        user={props.user}
        currentlyPlaying={props.currentlyPlaying}
        deleteCurrentlyPlaying={props.deleteCurrentlyPlaying}
        setCurrentlyPlaying={props.setCurrentlyPlaying}
        isPlayingSound={props.isPlayingSound}
        playSound={props.playSound}
        pauseSound={props.pauseSound}
        handleUnlike={props.handleUnlike}
        handleLike={props.handleLike}
      />}
      {renderAudioPlayers()}
    </Router>
  );
};
const mapStateToProps = state => ({
  isPlayingSound: state.playerReducer.isPlayingSound,
  volume: state.playerReducer.volume,
  currentlyPlaying: state.playerReducer.currentlyPlaying,
  user: state.userReducer.user,
  isAuthenticated: state.userReducer.authenticated,
});

const mapDispatchToProps = {
  playSound,
  pauseSound,
  changeVolume,
  uploadSound,
  setCurrentlyPlaying,
  deleteCurrentlyPlaying,
  handleLike,
  handleUnlike,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
