import axios from 'axios';
import { React, useState } from 'react';

export default function SearchBar() {
  const [productName, setProductName] = useState('');
  // helper: handles click on the search button
  const clickHandler = () => {
    console.log('inside clickHandler');
    // https://api.spoonacular.com/food/products/22347?apiKey=f8dd3554d0444ddba0bdd8e8237f980d&includeNutrition=true
    axios.get(`/api/search/?productName=${productName}`)
      .then((res) => console.log(res.data));
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input
        placeholder="search for a product"
        product="product"
        type="text"
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
      />
      <button type="button" onClick={clickHandler}>Search</button>
    </form>
  );
}
