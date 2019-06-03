import React, {Component} from 'react';
import PhotoDisplayer from './PhotoDisplayer';

export default class Message extends Component {


  render () {
    return (
      <div className="message">
        <PhotoDisplayer
          imageSource={this.props.message.photo}
          filters={{
            sepia: this.props.message.sepia,
            blur: this.props.message.blur,
            contrast: this.props.message.contrast,
            hueShift: this.props.message.hueShift
          }}
        />
        <p>{this.props.message.text}</p>
        <div className="from">{"-- " + this.props.message.user + " at " + new Date(this.props.message.time).toLocaleString()}</div>
      </div>
    )
  }
}
