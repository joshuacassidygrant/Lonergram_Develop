import React, { Component } from 'react';
import Message from './Message';
import DetailBox from './DetailBox';
import {connect} from 'react-redux';
import {fetchMessages} from '../actions/messageActions';

const mapStateToProps = state => {
  return {
    messages: state.messages,
    loading: state.loading,
    error: state.error
  };
};

class ConnectedMessageFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
      hiddenDetailBox: true,
      detailBoxMessage: ""
    };
  }

  componentWillMount(){
    this.props.dispatch(fetchMessages());
  }

  render () {
    if (this.props.messages == null) {
        return(
          <div className="message-area" id="message-scroll">
            Loading!
          </div>
        )
    }

    if (this.props.messages.length < 1) {
      return (
        <div className="message-area" id="message-scroll">
          Couldn't find any pictures. Why don't you add one?
        </div>
      )
    }

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
