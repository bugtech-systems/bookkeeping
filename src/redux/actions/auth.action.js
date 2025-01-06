
import { LOGOUT_USER } from "./types";

import axios from "axios";
import { env_vars } from '../../Utils/config';
import { getChartOfAccounts, getTransactions } from "./data.action";
import moment from "moment";

import { SET_AUTHENTICATED, SET_AUTH_USER, SET_DATA, SEND_FORGET_PASSWORD_EMAIL, UPDATE_AUTH_USER, UPDATE_LOAD_USER, CLEAR_USER, CLEAR_ERRORS } from './types';

import { authHeader } from '../auth-header';


export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};

export const updateLoadUser = loading => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading,
    });
  };
};

export const setForgetPassMailSent = status => {
  return dispatch => {
    dispatch({
      type: SEND_FORGET_PASSWORD_EMAIL,
      payload: status,
    });
  };
};

export const registerUser = (user) => dispatch => {
  dispatch({ type: CLEAR_ERRORS })
  return axios
    .post(`${env_vars.api_url}/auth/signup`, user)
    .then(({ data }) => {
      // let { token } = data;
      // dispatch({type: UPDATE_AUTH_USER, payload: data })
      // localStorage.setItem('idToken', token);
      return window.location.href = '/signin'
    })
    .catch(({ response }) => {
      // dispatch()
      let { data } = response;
      console.log(response)

      // if(data.d){
      //   dispatch({type: SET_ERRORS, payload: data.d})
      // } else {
      //   dispatch({type: SET_ERRORS, payload: data})
      // }
      // dispatch(fetchError(message.text));
    });
};

export const socialLogin = (user, history) => dispatch => {
  console.log(user)
  dispatch({ type: CLEAR_ERRORS })
  return axios
    .post(`${env_vars.api_url}/auth/socials`, user)
    .then(({ data }) => {

      let { token } = data;
      dispatch({ type: UPDATE_AUTH_USER, payload: data })
      localStorage.setItem('idToken', token);

      dispatch(getUserData(history));
    })
    .catch(({ response }) => {
      // dispatch()
      console.log('Error')
      // dispatch(fetchError(message.text));
    });
};




export const getUserData = (history) => (dispatch) => {
  return axios.get(`${env_vars.api_url}/auth`, { headers: authHeader() }).then(
    ({ data }) => {
      let { user } = data;
      dispatch({ type: UPDATE_AUTH_USER, payload: user })
      dispatch({ type: SET_AUTHENTICATED })

    },
    (err) => {
      let data = err && err.response ? err.response.data : {};

      let { text, type } = data;
      if (text && type === 'error') {
        dispatch(logout())
      }
    }
  );
}



export const verifyOTP = (otp) => (dispatch) => {
  return axios.get(`${env_vars.api_url}/auth/otp/${otp}`, { headers: authHeader() }).then(
    ({ data }) => {
      console.log(data)
    },
    (err) => {
      console.log(err.response)
    }
  );
}


export const logout = (history) => {
  return (dispatch) => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('user');
    dispatch({
      type: CLEAR_USER
    });
    dispatch({
      type: LOGOUT_USER
    });

    axios.get(`${env_vars.api_url}/auth/logout`)
      .then(({ data }) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      });
  }
};


export const loginUser = ({ email, password }) => dispatch => {

  return axios.post(`${env_vars.api_url}/auth/signin`, {
    email,
    password
  }).then(response => {
    console.log(response, 'RES  ')
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    localStorage.setItem('idToken', response.data.token);

    return dispatch(getAuthUser());
  }).catch(err => {
    if (err.response && (err.response.status === 401 || err.response.status === 400)) {
      return { message: err.response.data.message }
    } else {
      return { message: "Something went wrong. Please Try again later" }
    }
  })
};

export const getAuthUser = (props) => dispatch => {

  return axios.get(`${env_vars.api_url}/auth`)
    .then(res => {
      console.log(res, 'GET AUTH')
      if (res && res.data) {
        dispatch({ type: SET_AUTH_USER, payload: res.data.user })
        dispatch({ type: SET_AUTHENTICATED });
      }

      // dispatch({ type: SET_DATA, payload: res.data })
      return res.data;
    }).catch(err => {
      console.log(err)
      if (err && err.response && err.response.data) {
        if (err.response.data.message === 'Unauthorized') {
          // window.location.href = '/login'
        }
      }
      dispatch({ type: SET_DATA, payload: [] });
      return null
    })
};




export const resetAccounts = () => dispatch => {

  //  dispatch(fetchStart());
  return axios.get(`${env_vars.api_url}/accounts/reset`)
    .then(res => {
      console.log(res.data, 'Trans OF')
      dispatch(getTransactions(moment().format('YYYY-MM-DD')))
      dispatch(getChartOfAccounts())
      return res.data
    })
    .catch(err => {
      console.log(err)
      return null
    })
};