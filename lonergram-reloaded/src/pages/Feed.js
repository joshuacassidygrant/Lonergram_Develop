import React, { Component } from 'react';
import FormPanel from '../components/FormPanel';
import MessageFeed from '../components/MessageFeed';
import ControlPanel from '../components/ControlPanel';

export default class Feed extends Component {
  render() {
    return (
      <div className="row">
        <div className="column one-third right" id="left-hand-column">
          <FormPanel />
          <ControlPanel />
        </div>
        <div className="column two-thirds message-bg controls-collapsed">
          <MessageFeed />
        </div>
      </div>
    )
  }
}
