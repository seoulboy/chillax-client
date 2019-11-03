import React, { useEffect } from 'react';
import './Navbar.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser, logoutUser } from '../../actions/userActions';
import { SERVER_URL } from '../../constants';

const Navbar = ({ fetchUser, logoutUser, isAuthenticated, user }) => {
  useEffect(() => {
    fetchUser();
  }, []);

  console.log('user', user);

  const routes = ['chillax', 'browse', 'library'];

  const handleGoogleSignInClick = () => {
    window.open(`${SERVER_URL}/auth/google`, '_self');
  };

  const handleLogoutClick = async () => {
    await window.open(`${SERVER_URL}/auth/logout`, '_self');
    logoutUser();
  };

  return (
    <div className='nav-container'>
      <ul>
        {routes.map(route => {
          return (
            <li key={route}>
              <Link to={route}>{route}</Link>
            </li>
          );
        })}
        {isAuthenticated ? (
          <li className='sign-in-out' onClick={handleLogoutClick}>
            Sign out
          </li>
        ) : (
          <li className='sign-in-out' onClick={handleGoogleSignInClick}>
            Sign in using Google+
          </li>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ userReducer }) => ({
  isAuthenticated: userReducer.authenticated,
  user: userReducer.user,
});

const mapDispatchToProps = {
  fetchUser,
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
