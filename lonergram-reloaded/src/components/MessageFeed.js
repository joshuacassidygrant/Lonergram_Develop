import React, { Component } from 'react';
import Message from './Message';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {messages: state.messages};
};

const ConnectedMessageFeed = ({messages}) => (
  <div className="message-area" id="message-scroll">
    {messages.map(el => (
      <div id={"message" + el.id} key={el.id}>
        <Message key={el.id} message={el}/>
      </div>
    ))}
  </div>
);


const MessageFeed = connect(mapStateToProps)(ConnectedMessageFeed);
export default MessageFeed;
