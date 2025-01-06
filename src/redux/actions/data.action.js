
import { SET_CHART_ACCOUNTS, SET_DATA, SET_ENTRY, SET_TRANSACTIONS } from "./types";

import axios from "axios";
import { env_vars } from '../../Utils/config';
import moment from "moment";


export const getChartOfAccounts = () => dispatch => {

  //  dispatch(fetchStart());
  return axios.get(`${env_vars.api_url}/accounts`)
    .then(res => {
      console.log(res.data, 'CHART OF')
      dispatch({ type: SET_CHART_ACCOUNTS, payload: res.data })
      return res.data
    })
    .catch(err => {
      console.log(err)
      return null
    })

};


export const createChartAccount = (props) => dispatch => {

  //  dispatch(fetchStart());
  return axios.post(`${env_vars.api_url}/accounts`, props)
};


export const createTransactions = (props) => dispatch => {

  //  dispatch(fetchStart());
  return axios.post(`${env_vars.api_url}/transactions`, props)
    .then(res => {
      dispatch(getTransactions(moment().format('YYYY-MM-DD')))
      dispatch(getChartOfAccounts())
      return res.data;
    })
    .catch(err => {
      return null
    })
};

export const createAiTransactions = (props) => dispatch => {

  //  dispatch(fetchStart());
  return axios.post(`${env_vars.api_url}/transactions/aientry`, props)
};

export const createAi = (props) => dispatch => {

  //  dispatch(fetchStart());
  return axios.post(`${env_vars.api_url}/transactions/ai`, props)
};


export const getTransactions = (date) => dispatch => {

  //  dispatch(fetchStart());
  return axios.get(`${env_vars.api_url}/transactions?start_date=${date}&end_date=${date}`)
    .then(res => {
      console.log(res.data, 'Trans OF')
      dispatch({ type: SET_TRANSACTIONS, payload: res.data })
      return res.data
    })
    .catch(err => {
      console.log(err)
      return null
    })
};