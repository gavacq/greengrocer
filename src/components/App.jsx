/* eslint-disable */

import { React, useEffect, useState } from 'react';
import '../index.scss';
import './App.scss';
import useWindowSize from '../hooks/useWindowSize';
// import axios from 'axios';

import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Lists from './Lists';
import Stats from './Stats';
import Nav from './Nav';
import Home from './Home';


// App component
function App() {
  const [height, width] = useWindowSize();

  console.log('height: ', height, 'width: ', width);
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
        </section>

        <section className="green">
          <div className="wave">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill" />
            </svg>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default App;
