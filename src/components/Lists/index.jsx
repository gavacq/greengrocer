import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import NewList from './NewList';

export default function List() {
  const [list, setList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/lists')
      .then((res) => {
        setAllProducts(res.data.results);
      })
      .catch(() => {
        console.log('NOT GOOD');
      });
  }, []);

  const mappedList = allProducts.map((product) => (
    <p>
      list id:
      {product.list_id}
      title:
      {product.title}
    </p>
  ));

  // on page load get all lists from db
  return (
    <main>
      <Search setList={setList} />
      <NewList list={list} />
      {mappedList}
    </main>
  );
}
