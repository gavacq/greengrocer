import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import NewList from './NewList';
import AllLists from './AllLists';

export default function List() {
  const [newList, setNewList] = useState({});
  const [allLists, setAllLists] = useState([]);
  const [results, setResults] = useState([]);
  const [idToReplace, setIdToReplace] = useState(null);

  const replaceProduct = (newProduct) => {
    const newListReplaced = newList.products.map((p) => {
      if (p.api_id === idToReplace) {
        return newProduct;
      }

      return { ...p };
    });

    const listDetails = {
      list_id: undefined,
      date_created: undefined,
      co2_saved: 0,
    };

    setNewList({
      ...listDetails,
      newListReplaced,
    });
  };

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
      <Search
        setNewList={setNewList}
        results={results}
        setResults={setResults}
        replaceProduct={replaceProduct}
        idToReplace={idToReplace}
      />
      <NewList newList={newList} setResults={setResults} setIdToReplace={setIdToReplace} />
      <AllLists allLists={allLists} setNewList={setNewList} />
    </main>
  );
}
