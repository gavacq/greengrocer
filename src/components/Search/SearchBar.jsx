import { React, useState } from 'react';

export default function SearchBar() {
  const [productName, setProductName] = useState('');
  return (
    <form>
      <input
        placeholder="search for a product"
        product="product"
        type="text"
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
