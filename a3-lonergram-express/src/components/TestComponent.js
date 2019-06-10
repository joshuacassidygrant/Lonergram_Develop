import React, {Component} from 'react';

export default class TestComponent extends Component{
  constructor(props) {
    super(props);
    this.state = { apiResponse: ""};
  }

  testApi() {
    fetch("http://localhost:9000/messages")
      .then(res=> res.text())
      .then(res => this.setState({apiResponse: res}));
  }

  componentWillMount() {
    this.testApi();
  }

  render() {
    return (
      <p className="t"> {this.state.apiResponse} </p>
    )
  }
}
