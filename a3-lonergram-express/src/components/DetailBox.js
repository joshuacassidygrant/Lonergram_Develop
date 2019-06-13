import React, {Component} from 'react';
import PhotoDisplayer from './PhotoDisplayer';
import EditPanel from './EditPanel';

export default class DetailBox extends Component {

  constructor() {
    super();
    this.state = {
      edit: false
    }
  }

  render() {
    if (this.props.hidden === true) return "";
    return (
      <div className="details-box">
      {this.state.edit &&
        <div className="column quarter">
          <EditPanel message={this.props.message}/>
        </div>
      }
          <PhotoDisplayer
            imageSource={this.props.message.photo}
            filters={this.props.message.filters}
          />
          <p>{this.props.message.text}</p>
          <div className="from">{"-- " + this.props.message.user + " at " + new Date(this.props.message.time).toLocaleString()}</div>
          <button onClick={this.dismiss}> Dismiss </button>
          <button onClick={this.edit}> Edit </button>
      </div>
    )
  }

  dismiss = () => {
    this.setState({
      edit: false
    })
    this.props.dismissDetail();
  }

  edit = () => {
    this.setState({
      edit: true
    })
  }

}
