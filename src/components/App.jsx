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
            <div>
              <h4>Contact us</h4>
              <div className="contact-item">+1 6969 42020</div>
              <div className="contact-item">greengrocer@mail.com</div>
              <div className="credits">
                {/* eslint-disable-next-line */}
                Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik </a>
                {/* eslint-disable-next-line */}
                from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
              </div>
            </div>
            <div className="social-icons">
              <i className="fab fa-instagram" />
              <i className="fab fa-twitter" />
              <i className="fab fa-facebook" />
            </div>
          </footer>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
