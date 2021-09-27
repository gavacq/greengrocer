import { React, useState } from 'react';
import Search from './Search';
import NewList from './NewList';

export default function List() {
  const [newProduct, setNewProduct] = useState({});
  return (
    <main>
      <Search setNewProduct={setNewProduct} />
      <NewList newProduct={newProduct} />
    </main>
  );
}
