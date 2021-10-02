/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import axios from 'axios';

import Earth from './Earth';
import Chart from './Chart';

export default function Stats() {
  // on page load get all lists from db
  const [allLists, setAllLists] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);

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
    <section>
      <div className="stats-container">
        <Earth products={products} />
        <Chart allLists={allLists} />
      </div>
    </section>
  );
}
