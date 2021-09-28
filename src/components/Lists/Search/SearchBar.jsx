import axios from 'axios';
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';

export default function SearchBar(props) {
  const [productName, setProductName] = useState('');

  // helper: handles click on the search button
  const clickHandler = () => {
    console.log('inside clickHandler');
    axios.get(`/api/search/?productName=${productName}`)
      .then((res) => {
        // just setResults with id, title, and image
        console.log('MY RESPONSE : ', res);
        const results = res.data.map((product) => ({
          id: product.id,
          title: product.title,
          image: product.image,
          upc: product.upc,
        }));
        props.setResults(results);
      });

    // .then((res) => console.log(res.data));
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
      <button type="button" onClick={clickHandler}>search</button>
    </form>
  );
}

SearchBar.propTypes = {
  setResults: PropTypes.func.isRequired,
};
