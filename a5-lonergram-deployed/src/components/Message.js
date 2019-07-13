import React, {Component} from 'react';
import PhotoDisplayer from './PhotoDisplayer';

export default class Message extends Component {

  handleDetails = () => {
    this.props.select(this.props.message);
  }

  handleDelete = () => {
    this.props.delete(this.props.message);
  }

  render () {
    let that = this;
    return (
      <div className="message">
        <PhotoDisplayer
          imageSource={this.props.message.photo}
          filters={this.props.message.filters}
        />
        <p>{this.props.message.text}</p>
        <div className="from">
          {"-- " + this.props.message.user + " at " + new Date(this.props.message.time).toLocaleString()}

          { 'edits' in that.props.message &&
            that.props.message.edits.map(el => (
              <div key={el.id}>
                Edited by {el.editorName} at {new Date(el.time).toLocaleString()}
              </div>
            ))
          }

        </div>
        <button onClick={this.handleDetails}>Details</button>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    )


  }
}
