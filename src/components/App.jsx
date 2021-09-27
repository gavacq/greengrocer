// import { React, useState, useEffect } from 'react';
import { React } from 'react';
// import axios from 'axios';
import './App.scss';

import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Lists from './Lists';
import Stats from './Stats';
import Nav from './Nav';
import Home from './Home';

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
