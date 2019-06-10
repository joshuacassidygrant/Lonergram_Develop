import React from 'react';
import { BrowserRouter  as Router, Route } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import About from './pages/About.js';
import Feed from './pages/Feed.js';
import Privacy from './pages/Privacy.js';

import AppHeader from './components/AppHeader.js';

import './App.css';

function App() {
  return (
    <div className ="container" id="main-container">
      <Router>
        <AppHeader />
        <PageLayout>
          <Route path="/" exact component={Feed} />
          <Route path="/about" component={About} />
          <Route path="/privacy" component={Privacy} />
        </PageLayout>
      </Router>
    </div>
  );
}

export default App;
