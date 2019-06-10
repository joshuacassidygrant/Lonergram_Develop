import React, { Component } from 'react';
import Message from './Message';
import DetailBox from './DetailBox';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {messages: state.messages};
};

class ConnectedMessageFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenDetailBox: true,
      detailBoxMessage: null
    };
  }

  render () {
    return (
      <div className="message-area" id="message-scroll">
      <DetailBox hidden={this.state.hiddenDetailBox} message={this.state.detailBoxMessage} dismissDetail={this.dismissDetails} />

        {this.props.messages.map(el => (
          <div id={"message" + el.id} key={el.id}>
            <Message key={el.id} message={el} select={this.detailView}/>
          </div>
        ))}
      </div>
    )
  }

  detailView = (message) => {
    this.setState ({
      hiddenDetailBox: false,
      detailBoxMessage: message
    });
    console.log("here");
  }

  dismissDetails = () => {
    this.setState({
      hiddenDetailBox: true
    })
  }


}


const MessageFeed = connect(mapStateToProps)(ConnectedMessageFeed);

export default MessageFeed;
