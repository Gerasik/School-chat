/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import Chat from './components/chat/Chat';
import Authorization from './components/authorization/Authorization';
import store from './redux/store';
import { logIn } from './redux/actions';

import './style.sass';

const name = localStorage.getItem('userName');
if (name) store.dispatch(logIn(name));

const App = ({ auth }) => (auth ? (<Chat className="chat" />) : (<Authorization />));

const mapStateToProps = (state) => {
  const { authorization } = state;
  return { auth: authorization.auth };
};

export default connect(mapStateToProps)(App);
