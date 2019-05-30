import React, { Component } from 'react';
import NavBar from './NavBar';

export default class AppHeader extends Component{
  render() {
      return (
        <div className="header">
          <NavBar />
        </div>
      )
  }
}
