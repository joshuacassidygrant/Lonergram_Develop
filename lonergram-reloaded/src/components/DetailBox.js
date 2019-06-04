import React, {Component} from 'react';
import PhotoDisplayer from './PhotoDisplayer';

export default class DetailBox extends Component {

  render() {
    if (this.props.hidden === true) return "";
    return (
      <div className="details-box">
          <PhotoDisplayer
            imageSource={this.props.message.photo}
            filters={this.props.message.filters}
          />
          <p>{this.props.message.text}</p>
          <div className="from">{"-- " + this.props.message.user + " at " + new Date(this.props.message.time).toLocaleString()}</div>
          <button onClick={this.dismiss}> Dismiss </button>
      </div>
    )
  }

  dismiss = () => {
    this.props.dismissDetail();
  }

}
