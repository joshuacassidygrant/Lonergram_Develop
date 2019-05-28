import React from 'react';
import { BrowserRouter  as Router, Route, Link } from 'react-router-dom';
import PageLayout from './components/PageLayout.js';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={PageLayout}/>
      <Route path="/aa" component={PageLayout}/>
      <Route path="/bb" />
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
    </Router>
  );
}

export default App;
