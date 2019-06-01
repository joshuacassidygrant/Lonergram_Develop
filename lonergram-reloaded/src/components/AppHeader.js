import React, { Component } from 'react';
import NavBar from './NavBar';
import {Logo} from './Logo';

export default class AppHeader extends Component{
  render() {
      return (
          <header className="container" id="nav-container">
            <div className="row">
              <div className="column above right half brand-bg">
                <Logo />
              </div>
              <div className="column above half">
                <NavBar />
              </div>
            </div>
          </header>
      )
  }
}
