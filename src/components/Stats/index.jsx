/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './index-stats.scss';
import Earth from './Earth';
import Chart from './Chart';

export default function Stats() {
  // on page load get all lists from db
  const [allLists, setAllLists] = useState([]);
  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(true);

  const toggleHelper = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/lists'),
      axios.get('/api/lists/products'),
    ]).then((res) => {
      setAllLists(res[0].data.results);
      setProducts(res[1].data.results.rows);
    });
  }, []);

  return (
    <div className="stats-container" style={{ width: '100vw' }}>
      <button className={toggle ? 'stats-btn stats-btn-pink' : 'stats-btn stats-btn-blue'} onClick={toggleHelper} type="button">{toggle ? 'Show globe' : 'Show graph'}</button>
      <div className="graph-container">
        {toggle ? <Chart allLists={allLists} /> : <Earth products={products} />}
      </div>
    </div>
  );
}
