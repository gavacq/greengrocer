import { React, useState } from 'react';
import '../index.scss';
import './App.scss';
// import axios from 'axios';

import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Lists from './Lists';
import Stats from './Stats';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import ScrollToTop from './ScrollToTop';
import { AppContext } from '../lib/context';

// App component
function App() {
  const [user, setUser] = useState({});

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Router>
        <ScrollToTop />
        <div className="App">
          <section className="white">
            <Nav />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/lists" component={Lists} />
              <Route path="/stats" component={Stats} />
              <Route path="/login" component={Login} />
            </Switch>
          </section>

          <footer>
            <p>Contact us</p>
          </footer>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
