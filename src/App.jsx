import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Search from './components/Search';

// main react component, rendered by index.js
function App() {
  const [helloWorld, sethelloWorld] = useState('');
  const [users, setUsers] = useState({});

  useEffect(() => {
    axios.get('api/data').then((res) => {
      sethelloWorld(res.data.message);
      setUsers(res.data.data);
    });
  }, []);

  return (
    <div className="App">
      <p>{helloWorld}</p>
      <p>groceryboiz !</p>
      <p>{users[0] && users[0].username}</p>
      <Search />
    </div>
  );
}

export default App;
