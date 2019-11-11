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
import Library from '../Library';
import Modal from '../Modal';
import UploadForm from '../UploadForm';
import AudioPlayer from '../AudioPlayer';
import {
  playSound,
  pauseSound,
  changeVolume,
  uploadSound,
  setCurrentlyPlaying,
} from '../../actions/soundActions';

const App = props => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const displayUploadModal = () => {
    setShowUploadModal(true);
  };
  const hideUploadModal = () => {
    setShowUploadModal(false);
  };

  return (
    <Router>
      <Navbar displayUploadModal={displayUploadModal} />
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
            />
          )}
        />
        <Route path='/library' component={Library} />
        <Route path='/*' component={() => <h1>Not Found</h1>} />
      </Switch>
      <Modal handleClose={hideUploadModal} show={showUploadModal}>
        <UploadForm
          handleClose={hideUploadModal}
          showUploadModal={showUploadModal}
          uploadSound={props.uploadSound}
          user={props.user}
        />
      </Modal>
      <AudioPlayer
        isPlayingSound={props.isPlayingSound}
        volume={props.volume}
        currentlyPlaying={props.currentlyPlaying}
      />
    </Router>
  );
};
const mapStateToProps = state => ({
  isPlayingSound: state.playerReducer.isPlayingSound,
  volume: state.playerReducer.volume,
  currentlyPlaying: state.playerReducer.currentlyPlaying,
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  playSound,
  pauseSound,
  changeVolume,
  uploadSound,
  setCurrentlyPlaying,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
