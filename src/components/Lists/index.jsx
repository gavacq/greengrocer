import { React, useState } from 'react';
import Search from './Search';
import NewList from './NewList';

export default function List() {
  const [list, setList] = useState({});
  return (
    <main>
      <Search setList={setList} />
      <NewList list={list} />
    </main>
  );
}
