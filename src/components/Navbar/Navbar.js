import React, { useEffect } from 'react';
import './Navbar.scss';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchUser, logoutUser } from '../../actions/userActions';
import { SERVER_URL } from '../../constants';

const Navbar = ({fetchUser, logoutUser, isAuthenticated, displayUploadModal, location}) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const routes = ['home', 'browse', 'library'];

  const handleGoogleSignInClick = () => {
    window.open(`${SERVER_URL}/auth/google`, '_self');
  };

  const handleLogoutClick = async () => {
    await window.open(`${SERVER_URL}/auth/logout`, '_self');
    await logoutUser();
    alert('you have successfully signed out');
  };

  return (
    <div className='nav-container'>
      <ul>
        {routes.map(route => {
          const path = '/' + route;
          return (
            <li
              className={
                location.pathname === path
                  ? 'nav-menu-selected'
                  : 'nav-menu'
              }
              key={route}
            >
              <Link to={route}>{route}</Link>
            </li>
          );
        })}
        {isAuthenticated && (
          <li
            className='show-upload-modal-button'
            onClick={displayUploadModal}
          >
            Upload
          </li>
        )}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
