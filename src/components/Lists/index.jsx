import { React, useState } from 'react';
import Search from './Search';
import NewList from './NewList';

export default function List() {
  const [list, setList] = useState([]);

  // on page load get all lists from db
  return (
    <main>
      <Search setList={setList} />
      <NewList list={list} />
    </main>
  );
}
