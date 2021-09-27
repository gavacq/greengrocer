// import { React, useState, useEffect } from 'react';
import { React } from 'react';
// import axios from 'axios';
import './App.css';

import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Lists from './components/Lists';
import Stats from './components/Stats';
import Nav from './components/Nav';
import Home from './components/Home';

// main react component, rendered by index.js
function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/lists" component={Lists} />
          <Route path="/stats" component={Stats} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
