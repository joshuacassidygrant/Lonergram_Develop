import React, {Component} from 'react';

export default class ControlPanel extends Component {
  render () {
    return (
      <form className="row" id="message-controls">
        <div className="row" id="controls-toggle" >CONTROLS:</div>
        <div className="one-third column-borderless">
          <p>IMPORT CONTENT:</p>
          <input id="json-upload" type="file" accept="text/json"  />
        </div>
        <div className="quarter column-borderless">
          <p>EXPORT CONTENT:</p>
          <input type="button" value="EXPORT" /> <span id="download-link-holder"></span>
        </div>
        <div className="quarter column-borderless">
          <p>CLEAR CONTENT:</p>
          <input type="button" value="CLEAR" />
        </div>
      </form>
    )
  }
}
