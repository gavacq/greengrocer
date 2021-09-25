import { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

function App() {
  const [helloWorld, sethelloWorld] = useState('')
  const [users, setUsers] = useState({})

  useEffect(() => {
    axios.get('api/data')
      .then((res) => {
        sethelloWorld(res.data.message)
        setUsers(res.data.data)
      });
  }, []);

  console.log(users)
  return (
    <div className="App">
      <p>{helloWorld}</p>
      <p>groceryboiz !</p>
      <p>{users[0] && users[0].username}</p>
    </div>
  );
}

export default App;
