import { React, useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';
import '../../../index.scss';
import productSearch from '../../../helpers/search';

export default function SearchBar(props) {
  const { setResults } = props;
  const [productName, setProductName] = useState('');

  // helper: handles click on the search button
  const clickHandler = () => {
    console.log('inside clickHandler');
    productSearch(productName).then((results) => setResults(results));
  };

  return (
    <div className="search-container">

      <h2>What are you looking for?</h2>
      <form className="search-form" onSubmit={(event) => event.preventDefault()}>
        <input
          placeholder="search for a product"
          product="product"
          type="text"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        />
        <button className="search-button" type="button" onClick={clickHandler}>search</button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  setResults: PropTypes.func.isRequired,
};
