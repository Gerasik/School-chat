/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './sendMessage.sass';

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  updateInput = (input) => {
    this.setState({ input });
  };

  handleAddTodo = (e) => {
    const { input } = this.state;
    const { name, socket } = this.props;
    e.preventDefault();
    if (input.length > 0) {
      const message = JSON.stringify({
        from: name,
        message: input,
      });
      socket.send(message);
      this.setState({ input: '' });
    }
  };

  render() {
    const { input } = this.state;
    return (
      <div>
        <form className="send-from" onSubmit={this.handleAddTodo}>
          <input
            className="send-from__text"
            onChange={(e) => this.updateInput(e.target.value)}
            value={input}
            placeholder="message"
          />
          <button type="submit" className="send-from__send">
            Send
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { authorization } = state;
  const { websocket } = state;
  return { name: authorization.authName, socket: websocket.socket };
};

export default connect(mapStateToProps)(SendMessage);
