import { React, useEffect, useState } from 'react';
import axios from 'axios';

import Earth from './Earth';

export default function Stats() {
  // on page load get all lists from db
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.get('/api/lists')
      .then((res) => {
        setLists(res.data.results);
      });
  });

  return (
    <section>
      <div className="stats-container">
        <Earth lists={lists} />
      </div>
    </section>
  );
}
