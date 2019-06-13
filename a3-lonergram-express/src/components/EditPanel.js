import React, {Component} from 'react';
import {editMessage} from '../actions/messageActions';

export default class EditPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={this.handleSubmit}>Submit</button>
    )
  }

  handleSubmit = () => {
    editMessage(this.props.message);
  }
}
