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
          <div className="wave">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill" />
            </svg>
          </div>

          <section className="home-button">
            <div className="btn-wrapper">
              <button type="button" className="home-btn">create new list</button>
            </div>
          </section>
        </section>
      </div>
    </Router>
  );
}

export default App;
