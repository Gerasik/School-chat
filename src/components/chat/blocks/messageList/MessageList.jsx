/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import './messageList.sass';

const MessageList = ({ mesList, name }) => (
  <>
    <ul className="message-list">
      {
        mesList.slice(mesList.length - 50).map((item) => {
          let userPos = 'left';
          if (item.from === name) userPos = 'right';
          return (
            <li className={`wrap-${userPos}`} key={item.id}>
              <div className="message">
                <span className="message__from">{item.from}</span>
                <span className="message__time">{new Date(item.time).toString()}</span>
                <p className="message__text">{item.message}</p>
              </div>
            </li>
          );
        })
    }
    </ul>
  </>
);

const mapStateToProps = (state) => {
  const { authorization } = state;
  const { messages } = state;
  return { name: authorization.authName, mesList: messages.messages };
};

export default connect(mapStateToProps)(MessageList);
