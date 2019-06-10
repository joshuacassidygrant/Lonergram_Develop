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
      messages: null,
      hiddenDetailBox: true,
      detailBoxMessage: null
    };
  }

  componentWillMount(){
    fetch("http://localhost:9000/messages")
      .then(res=> res.text())
      .then(res => this.setState({messages: JSON.parse(res)}));
  }

  render () {
    if (this.state.messages == null) {
        return(
          <div className="message-area" id="message-scroll">
            Loading!
          </div>
        )
    }

    return (
      <div className="message-area" id="message-scroll">
      <DetailBox hidden={this.state.hiddenDetailBox} message={this.state.detailBoxMessage} dismissDetail={this.dismissDetails} />

        {this.state.messages.map(el => (
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
