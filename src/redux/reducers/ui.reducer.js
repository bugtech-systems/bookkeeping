import {
  CLOSE_MODAL, OPEN_MODAL,
  SET_LOADING,
  STOP_LOADING, SET_ERRORS, CLEAR_ERRORS
} from "../actions/types";


const INIT_STATE = {
  loading: false,
  modal: null,
  errors: {}
};

export default (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case STOP_LOADING: {
      return {
        ...state,
        loading: false
      };
    }

    case SET_ERRORS: {
      return {
        ...state,
        errors: payload
      };
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        errors: {}
      };
    }


    case OPEN_MODAL: {
      return {
        ...state,
        modal: payload
      };
    }


    case CLOSE_MODAL: {
      return {
        ...state,
        modal: null
      };
    }



    default:
      return state;
  }
};
