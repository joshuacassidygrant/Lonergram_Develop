import React, {Component} from 'react';
import {importMessages, clearMessages} from '../actions/index';
import {connect} from 'react-redux';
import {clearAllMessages} from '../actions/messageActions';

const mapDispatchToProps = (dispatch) => {
  return {
    importMessages: messages => dispatch(importMessages(messages)),
    clearMessages: () => dispatch(clearAllMessages(null))
  };
}

const mapStateToProps = state => {
  return {messages: state.messages};
};

class ConnectedControlPanel extends Component {
  render () {
    return (
      <form className="row column-borderless" id="message-controls">
        <div>
          <p>IMPORT CONTENT:</p>
          <input id="json-upload" type="file" accept="text/json" onChange={this.handleImport}  />
        </div>
        <div>
          <p>EXPORT CONTENT:</p>
          <input type="button" value="EXPORT" onClick={this.handleExport} /> <span id="download-link-holder"></span>
        </div>
        <div>
          <p>CLEAR CONTENT:</p>
          <input type="button" value="CLEAR" onClick={this.handleClear}/>
        </div>
      </form>
    )
  }

  handleImport = (event) => {
    let that = this;
    let reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = function () {
       let messageText = reader.result;
       let messages = JSON.parse(messageText);
       that.props.importMessages(messages);
    };
  }

  handleExport = (event) => {
    let blob = new Blob([JSON.stringify(this.props.messages)], { type: "json" });

    let dl = document.createElement('a');
    dl.download = "content.json";
    dl.href = URL.createObjectURL(blob);
    dl.dataset.downloadurl = ["json", dl.download, dl.href].join(':');
    dl.innerHTML = "Download!";

    document.getElementById("download-link-holder").appendChild(dl);
  }

  handleClear = () => {
    clearMessages();
    this.props.clearMessages();
  }
}

const ControlPanel = connect(mapStateToProps, mapDispatchToProps)(ConnectedControlPanel);

export default ControlPanel;
