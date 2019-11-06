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
            />
          )}
        />
        <Route path='/browse' component={Browse} />
        <Route path='/library' component={Library} />
        <Route path='/*' component={() => <h1>Not Found</h1>} />
      </Switch>
      <Modal handleClose={hideUploadModal} show={showUploadModal}>
        <UploadForm
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
  isPlayingSound: state.soundReducer.isPlayingSound,
  volume: state.soundReducer.volume,
  currentlyPlaying: state.soundReducer.currentlyPlaying,
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  playSound,
  pauseSound,
  changeVolume,
  uploadSound,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
