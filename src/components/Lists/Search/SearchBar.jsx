import axios from 'axios';
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';
import '../../../index.scss';

export default function SearchBar(props) {
  const { setResults } = props;
  const [productName, setProductName] = useState('');

  // helper: handles click on the search button
  const clickHandler = () => {
    console.log('inside clickHandler');
    axios.get(`/api/search/?productName=${productName}`)
      .then((res) => {
        // just setResults with id, title, and image
        console.log('MY RESPONSE : ', res.data);
        const results = res.data.map((product) => ({
          api_id: product.id,
          title: product.title,
          image: product.image,
          lat: product.lat,
          long: product.long,
          co2: product.co2,
        }));
        setResults(results);
      });

    // .then((res) => console.log(res.data));
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
