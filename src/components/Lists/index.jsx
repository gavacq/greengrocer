import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import NewList from './NewList';
import AllLists from './AllLists';

export default function List() {
  const [newList, setNewList] = useState([]);
  const [allLists, setAllLists] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('/api/lists')
      .then((res) => {
        setAllLists(res.data.results);
      })
      .catch(() => {
        console.log('NOT GOOD');
      });
  }, []);

  // TODO: create list component
  // const mappedList = allLists.map((product) => (
  //   <p>
  //     list id:
  //     {product.list_id}
  //     title:
  //     {product.title}
  //   </p>
  // ));

  // on page load get all lists from db
  return (
    <main>
      <Search setNewList={setNewList} results={results} setResults={setResults} />
      <NewList newList={newList} setResults={setResults} />
      <AllLists allLists={allLists} setNewList={setNewList} />
    </main>
  );
}
