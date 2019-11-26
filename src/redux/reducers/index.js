import { combineReducers } from 'redux';
import messages from './messages';
import authorization from './authorization';
import websocket from './websocket';

export default combineReducers({ messages, authorization, websocket });
