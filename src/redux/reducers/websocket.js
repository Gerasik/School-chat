import { ON_CONNECT, ON_DISCONNECT } from '../actionTypes';

const initialState = {
  socket: null,
  socketState: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ON_CONNECT: {
      const { socket } = action.payload;
      return {
        ...state,
        socket,
        socketState: true,
      };
    }
    case ON_DISCONNECT: {
      return {
        ...state,
        socket: null,
        socketState: false,
      };
    }
    default:
      return state;
  }
}
