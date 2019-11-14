import React, { useEffect } from 'react';
import './Navbar.scss';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchUser, logoutUser } from '../../actions/userActions';
import { SERVER_URL } from '../../constants';
import { Icon } from 'antd';

const Navbar = ({
  fetchUser,
  logoutUser,
  isAuthenticated,
  displayUploadModal,
  location,
}) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const routes = ['home', 'browse'];

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
        <li className='logo-text'>
          Chillax
        </li>
        {routes.map(route => {
          const path = '/' + route;
          if (route === 'browse') {
            return (
              isAuthenticated && (
                <li
                  className={
                    location.pathname === path
                      ? 'nav-menu-selected'
                      : 'nav-menu'
                  }
                  key={route}
                >
                  <Link to={route}><Icon type="customer-service" /></Link>
                </li>
              )
            );
          } else {
            return (
              <li
                className={
                  location.pathname === path ? 'nav-menu-selected' : 'nav-menu'
                }
                key={route}
              >
                <Link to={route}><Icon type="home" /></Link>
              </li>
            );
          }
        })}
        {isAuthenticated && (
          <li className='show-upload-modal-button' onClick={displayUploadModal}>
          <Icon type="cloud-upload" />
          </li>
        )}
        {isAuthenticated ? (
          <li className='sign-in-out' onClick={handleLogoutClick}>
            Logout
          </li>
        ) : (
          <li className='sign-in-out' onClick={handleGoogleSignInClick}>
            Login
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
