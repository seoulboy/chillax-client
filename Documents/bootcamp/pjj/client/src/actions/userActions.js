import { SERVER_URL } from '../constants';

export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';

export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN,
});
export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: { user },
});
export const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  payload: { error },
});

export const logoutUser = () => ({ type: LOGOUT_USER });

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export const fetchUser = () => {
  return dispatch => {
    dispatch(fetchUserBegin());
    return fetch(`${SERVER_URL}/auth/login/success`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    })
      .then(handleErrors)
      .then(json => {
        dispatch(fetchUserSuccess(json.user));
        return json.user;
      })
      .catch(error => dispatch(fetchUserFailure(error)));
  };
};
