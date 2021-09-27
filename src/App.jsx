// import { React, useState, useEffect } from 'react';
import { React } from 'react'
// import axios from 'axios';
import './App.css';

import List from './components/List';

// main react component, rendered by index.js
function App() {
  // useEffect(() => {
  //   axios.get('api/data').then((res) => {
  //     sethelloWorld(res.data.message);
  //     setUsers(res.data.data);
  //   });
  // }, []);

  return (
    <div className="App">
      <List />
    </div>
  );
}

export default App;
