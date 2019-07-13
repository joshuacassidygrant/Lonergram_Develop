import React, {Component} from 'react';

export default class WarningBox extends Component {

  render() {
    if (this.props.hidden === true) return "";
    return (
      <div className="warning-box">
        <h3>Warning!</h3>
        <p>{this.props.message}</p>
        <button onClick={this.dismiss}>Dismiss</button>
      </div>
    )
  }

  dismiss = () => {
    this.props.dismissWarning();
  }

}
