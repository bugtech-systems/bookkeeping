import { sortByType } from "../../utils/helpers";
import {
  CLEAR_CHART_ACCOUNTS,
  CLEAR_DATA,
  CLEAR_DESCRIPTION,
  CLEAR_ENTRY,
  CLEAR_TRANSACTIONS,
  SET_CHART_ACCOUNTS,
  SET_DATA,
  SET_DESCRIPTION,
  SET_ENTRY,
  SET_TRANSACTIONS,
} from "../actions/types";




const INIT_STATE = {
  accounts: [],
  transactions: [],
  entry: {
    description: ""
  },
  description: ""
};

export default (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_DATA: {
      return {
        ...state,
        data: payload
      };
    }
    case CLEAR_DATA: {
      return {
        ...state,
        data: []
      };
    }

    case SET_ENTRY: {
      return {
        ...state,
        entry: payload
      };
    }
    case CLEAR_ENTRY: {
      return {
        ...state,
        entry: {
          description: ""
        }
      };
    }

    case SET_DESCRIPTION: {
      return {
        ...state,
        description: payload
      };
    }
    case CLEAR_DESCRIPTION: {
      return {
        ...state,
        description: ""
      };
    }

    case SET_CHART_ACCOUNTS: {
      let newData = sortByType(payload);
      console.log(newData, 'new data')
      return {
        ...state,
        accounts: newData
      };
    }
    case CLEAR_CHART_ACCOUNTS: {
      return {
        ...state,
        accounts: []
      };
    }
    case SET_TRANSACTIONS: {
      return {
        ...state,
        transactions: payload
      };
    }
    case CLEAR_TRANSACTIONS: {
      return {
        ...state,
        transactions: []
      };
    }


    default:
      return state;
  }
};
