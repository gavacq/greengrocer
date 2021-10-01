import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import NewList from './NewList';
import AllLists from './AllLists';

export default function List() {
  const [newList, setNewList] = useState({
    list_id: undefined,
    date_created: undefined,
    co2_saved: 0,
    products: [],
  });
  const [allLists, setAllLists] = useState([]);
  const [results, setResults] = useState([]);
  const [idToReplace, setIdToReplace] = useState(null);

  const replaceProduct = (newProduct) => {
    const productsReplaced = newList.products.map((p) => {
      if (p.api_id === idToReplace) {
        return newProduct;
      }

      return { ...p };
    });

    const co2Diff = newList.products.find((p) => p.api_id === idToReplace).co2 - newProduct.co2;
    console.log('co2Diff', co2Diff, newList.co2_saved);

    setNewList((prev) => ({
      list_id: prev.list_id,
      date_created: prev.date_created,
      co2_saved: (prev.co2_saved || 0) + co2Diff,
      products: productsReplaced,
    }));
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
        setIdToReplace={setIdToReplace}
      />
      <NewList newList={newList} setResults={setResults} setIdToReplace={setIdToReplace} />
      <AllLists allLists={allLists} setNewList={setNewList} />
    </main>
  );
}
