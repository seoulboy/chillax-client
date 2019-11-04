import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Navbar from '../Navbar';
import Home from '../Home';
import Browse from '../Browse';
import Library from '../Library';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Redirect from='/home' to='/' />
        <Route exact path='/' component={Home} />
        <Route path='/browse' component={Browse} />
        <Route path='/library' component={Library} />
        <Route path='/*' component={() => <h1>Not Found</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
