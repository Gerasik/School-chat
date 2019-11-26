import { ADD_MESSAGE, REMOVE_MESSAGE } from '../actionTypes';

const initialState = {
  messages: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      const { message } = action.payload;
      return {
        ...state,
        messages: [...state.messages, ...message].sort((a, b) => a.time - b.time),
      };
    }
    case REMOVE_MESSAGE: {
      return {
        ...state,
        messages: [],
      };
    }
    default:
      return state;
  }
}
