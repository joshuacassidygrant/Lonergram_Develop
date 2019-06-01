import React, {Component} from 'react';

export default class ControlPanel extends Component {
  render () {
    return (
      <form class="row" id="message-controls">
        <div class="row" id="controls-toggle" onclick="toggleControls()">CONTROLS:</div>
        <div class="one-third column-borderless">
          <p>IMPORT CONTENT:</p>
          <input id="json-upload" type="file" accept="text/json" onchange="messageModule.loadContent(this.files, 'message-controls')" />
        </div>
        <div class="quarter column-borderless">
          <p>EXPORT CONTENT:</p>
          <input type="button" value="EXPORT" onclick="messageModule.exportContent()"/> <span id="download-link-holder"></span>
        </div>
        <div class="quarter column-borderless">
          <p>CLEAR CONTENT:</p>
          <input type="button" value="CLEAR"  onclick="messageModule.clearContent()"/>
        </div>
      </form>
    )
  }
}
