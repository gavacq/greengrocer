import { React, useState } from 'react';
// import PropTypes from 'prop-types';
import Search from './Search';
import ListProducts from './ListProducts';

export default function List() {
  const [newProduct, setNewProduct] = useState({});
  return (
    <main>
      <Search setNewProduct={setNewProduct} />
      <ListProducts newProduct={newProduct} />
    </main>
  );
}
