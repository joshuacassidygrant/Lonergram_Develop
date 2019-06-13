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
    if (this.state.edit) {
      return (
        <div className="details-box">
          <div>
            <EditPanel message={this.props.message} dismiss={this.dismiss}/>
          </div>
        </div>
      )
    }
    return (
      <div className="details-box">
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
