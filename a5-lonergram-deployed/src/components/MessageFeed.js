import React, { Component } from 'react';
import Message from './Message';
import DetailBox from './DetailBox';
import {connect} from 'react-redux';
import {fetchMessages} from '../actions/messageActions';
import {deleteMessage} from '../actions/messageActions';


const mapStateToProps = state => {
  return {
    messages: state.messages,
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMessage: message => dispatch(deleteMessage(message)),
    fetchMessages: () => dispatch(fetchMessages())
  }
}

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
    this.props.fetchMessages();
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
          <div id={"message" + el._id} key={el._id}>
            <Message key={el._id} message={el} select={this.detailView} delete={this.deleteMessage}/>
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
  }

  dismissDetails = () => {
    this.setState({
      hiddenDetailBox: true
    })
  }

  deleteMessage = (message) => {
    this.props.deleteMessage(message);
  }


}


const MessageFeed = connect(mapStateToProps, mapDispatchToProps)(ConnectedMessageFeed);

export default MessageFeed;
