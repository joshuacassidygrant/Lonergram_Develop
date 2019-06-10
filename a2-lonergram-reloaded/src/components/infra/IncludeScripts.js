import React, {Component} from 'react';

export default class IncludeScripts extends Component{
  render() {
      return (
        <div>
          <script type="text/javascript" src="scripts/messageDisplayModule.js"></script>
          <script type="text/javascript" src="scripts/messageFormModule.js"></script>
          <script type="text/javascript" src="scripts/main.js"></script>
        </div>
      )
  }
}
