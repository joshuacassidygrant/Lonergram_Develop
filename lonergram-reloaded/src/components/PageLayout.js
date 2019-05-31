import React, { Component } from 'react';

export default class PageLayout extends Component{
  render () {
    return (
      <div class="row">
        {this.props.children}
      </div>
    );
  }
}
