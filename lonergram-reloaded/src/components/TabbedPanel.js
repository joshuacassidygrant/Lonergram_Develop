import React, {Component} from 'react';

export default class TabbedPanel extends Component {

  constructor () {
    super();
    //bind click to state change
    this.state = {
      tabIndex: 0
    }
  }


  render () {
    var index = 0;
    return (
      <div>
        {
          this.props.children.map(el => (
          <button onClick={this.switchToTab} key={index} value={index++}>{el.props.name}</button>
        ))}
        <div>
          {this.props.children[this.state.tabIndex]}
        </div>
      </div>

    )
  }

  switchToTab = (event) => {
    this.setState({tabIndex: event.target.value});
  }
}
