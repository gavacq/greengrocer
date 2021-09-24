import { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

function App() {
  const [helloWorld, sethelloWorld] = useState('')

  useEffect(() => {
    axios.get('api/data')
      .then((res) => {

        sethelloWorld(res.data.message)
      });
    
  }, []);

  return (
    <div className="App">
      <p>{helloWorld}</p>
      <p>groceryboiz !</p>
    </div>
  );
}

export default App;
