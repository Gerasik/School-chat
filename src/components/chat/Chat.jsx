/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage, onConnect } from '../../redux/actions';
import store from '../../redux/store';
import MessageList from './blocks/messageList/MessageList';
import SendMessage from './blocks/sendMessage/SendMessage';
import Header from './blocks/header/Header';

import './chat.sass';

class Chat extends Component {
  componentDidMount() {
    const { socket } = this.props;
    if (!socket) store.dispatch(onConnect());
  }

  render() {
    const { socket } = this.props;
    if (socket) {
      socket.onmessage = (e) => {
        const message = JSON.parse(e.data);
        store.dispatch(addMessage(message));
        const chat = document.querySelector('.message-list');
        if (chat) chat.scrollTop = chat.scrollHeight;
      };
    }
    return (
      <>
        <Header />
        <section className="chat">
          <div className="chat-wrap">
            <MessageList />
          </div>
          <SendMessage />
        </section>
      </>
    );
  }
}

const mapStateToProps = ({ websocket }) => ({ socket: websocket.socket });

export default connect(mapStateToProps)(Chat);
