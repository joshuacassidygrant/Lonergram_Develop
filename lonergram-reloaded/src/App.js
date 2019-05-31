import React from 'react';
import { BrowserRouter  as Router, Route, Link } from 'react-router-dom';
import PageLayout from './components/PageLayout.js';

import AppHeader from './components/AppHeader.js';
import IncludeScripts from './components/infra/IncludeScripts';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div class ="container" id="main-container">
      <Router>
        <AppHeader />
        <PageLayout>
          <Route path="/" exact component={PageLayout} />
          <Route path="/aa" component={PageLayout} />
          <Route path="/bb" />
        </PageLayout>
        <div className="App">


          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
        <IncludeScripts />
      </Router>
    </div>
  );
}

export default App;
