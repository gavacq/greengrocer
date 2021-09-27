// import { React, useState, useEffect } from 'react';
import { React } from 'react';
// import axios from 'axios';
import '../index.scss';
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
        <section className="white">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/lists" component={Lists} />
            <Route path="/stats" component={Stats} />
          </Switch>

          <div className="icon strawberry">
            <img src="images/strawberry.png" alt="strawberry icon" />
          </div>
        </section>

        <section className="green">
          <div className="temp">
            <button type="button" className="home-btn">create new list</button>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default App;
