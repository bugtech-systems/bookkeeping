import {
  CLEAR_USER,
  LOGOUT_USER, SET_AUTHENTICATED, SET_AUTH_USER,
} from "../actions/types";

const INIT_STATE = {
  isAuthenticated: false,
  user: {},
};

export default (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: true
      }

    }


    case SET_AUTH_USER: {
      return {
        ...state,
        user: payload
      };
    }

    case CLEAR_USER: {
      return {
        ...state,
        user: {},
        isAuthenticated: false
      };
    }





    case LOGOUT_USER: {
      return {
        ...state,
        user: {},
        isAuthenticated: false
      };
    }

    default:
      return state;
  }
};
