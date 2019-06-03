import React, { Component } from 'react';
import Message from './Message';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {messages: state.messages};
};

const ConnectedMessageFeed = ({messages}) => (
  <div className="message-area" id="message-scroll">
    {messages.map(x => (
      <div id={"message" + x.id} key={x.id}>
        <Message message={x}/>
      </div>
    ))}
  </div>
);


const MessageFeed = connect(mapStateToProps)(ConnectedMessageFeed);
export default MessageFeed;

/*export default class MessageFeed extends Component {
  render () {
    return (
      <div className="message-area" id="message-scroll">
        {this.props.children}
      </div>
    )
  }
}*/
