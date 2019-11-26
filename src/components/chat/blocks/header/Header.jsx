/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import store from '../../../../redux/store';
import { logOut } from '../../../../redux/actions';

import './header.sass';

const lofOut = () => {
  store.dispatch(logOut());
};

const Header = ({ name, socketState }) => {
  let state;
  if (socketState) {
    state = (<span className="app-header__status-on">connected</span>);
  } else {
    state = (<span className="app-header__status-off">disconnected</span>);
  }
  return (
    <>
      <header className="app-header">
        <div className="app-header__user-name">
          <span>User Name:</span>
          <span>{name}</span>
        </div>
        <div className="app-header__status">
          {state}
        </div>
        <div className="app-header__log-out">
          <button type="submit" onClick={lofOut}>Log-out</button>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state) => {
  const { authorization } = state;
  const { websocket } = state;
  return { name: authorization.authName, socketState: websocket.socketState };
};

export default connect(mapStateToProps)(Header);
