import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends Component{
  render() {
      return (
          <nav className="navbar">
            <Link to="/">FEED</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/privacy">PRIVACY</Link>
          </nav>
      )
  }
}
