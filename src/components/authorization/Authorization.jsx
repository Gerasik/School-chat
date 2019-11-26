/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { logIn } from '../../redux/actions';
import store from '../../redux/store';

import './authorization.sass';

export default class Authorization extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  handleLogIn = (e) => {
    e.preventDefault();
    const { input } = this.state;
    if (input.length > 0) {
      store.dispatch(logIn(input));
      localStorage.setItem('userName', input);
    }
    this.setState({ input: '' });
  };

  updateInput = (input) => {
    this.setState({ input });
  };

  render() {
    const { input } = this.state;
    return (
      <div className="authorization-wrap">
        <h1>RS-CHAT</h1>
        <form className="authorization" onSubmit={this.handleLogIn}>
          <label
            className="authorization__name-lable"
            htmlFor="name"
          >
          Send your name
          </label>
          <input
            className="authorization__name"
            id="name"
            onChange={(e) => this.updateInput(e.target.value)}
            value={input}
            placeholder="User name"
          />
          <button type="submit" className="authorization__send">Send</button>
        </form>
      </div>
    );
  }
}
