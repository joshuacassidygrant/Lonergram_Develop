import React, { Component } from 'react';

export default class PageLayout extends Component{
  render() {
      return <p>{this.props.layoutStyle}</p>;
  }
}
