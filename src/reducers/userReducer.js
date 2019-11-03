import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGOUT_USER,
} from '../actions/userActions';

const initalState = {
  user: {},
  loading: false,
  error: null,
  authenticated: false,
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        authenticated: false,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        authenticated: true,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        authenticated: true,
      };
    case LOGOUT_USER:
      return {
        user: {},
        loading: false,
        error: null,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
