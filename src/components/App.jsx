import { React, useEffect, useState } from 'react';
import axios from 'axios';
import '../index.scss';
import './App.scss';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Lists from './Lists';
import Stats from './Stats';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import ScrollToTop from './ScrollToTop';
import { AppContext } from '../lib/context';

// App component
function App() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  return (
    <AppContext.Provider value={{
      userContext: [user, setUser],
      postsContext: [posts, setPosts],
    }}
    >
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
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
