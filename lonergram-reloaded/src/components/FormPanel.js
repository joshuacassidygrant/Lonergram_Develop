import React, { Component } from 'react';

export default class FormPanel extends Component {
  render () {
    return (
      <form class="message-form" id="message-form">
        <div>
          YOUR MESSAGE:
          <textarea class="message-input" id="message-text"></textarea>
        </div>
        <div>
          YOUR NAME:
          <input type="text" id="message-user" />
        </div>

        <input type="button" name="clear" value="CLEAR" onclick="messageFormModule.clearForm('message-form')"/>
        <input type="button" name="submit" value="SUBMIT" onclick="messageFormModule.captureMessage('message-form')"/>
      </form>
    )
  }
}
