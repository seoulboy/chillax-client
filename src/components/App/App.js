import React from 'react';
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
import AudioPlayer from '../AudioPlayer';
import {
  playSound,
  pauseSound,
  changeVolume,
} from '../../actions/soundActions';

const App = props => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Redirect from='/home' to='/' />
        <Route
          exact
          path='/'
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
      <AudioPlayer
        isPlayingSound={props.isPlayingSound}
        volume={props.volume}
      />
    </Router>
  );
};
const mapStateToProps = state => ({
  isPlayingSound: state.soundReducer.isPlayingSound,
  volume: state.soundReducer.volume,
});

const mapDispatchToProps = {
  playSound,
  pauseSound,
  changeVolume,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
