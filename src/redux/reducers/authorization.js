import { LOG_IN, LOG_OUT } from '../actionTypes';

const initialState = {
  authName: null,
  auth: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      const { name } = action.payload;
      return {
        ...state,
        auth: true,
        authName: name,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        auth: false,
        authName: null,
      };
    }
    default:
      return state;
  }
}
