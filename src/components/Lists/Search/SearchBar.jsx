import { React } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';
import '../../../index.scss';
import searchProducts from '../../../helpers/search';

export default function SearchBar(props) {
  const {
    setResults, setIdToReplace, productName, setProductName, setQueryDisplay,
  } = props;

  const clickHandler = () => {
    searchProducts(productName).then((results) => {
      setResults(results);
      setIdToReplace(null);
      setQueryDisplay(productName);
    });
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
  setIdToReplace: PropTypes.func.isRequired,
  setProductName: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
  setQueryDisplay: PropTypes.func.isRequired,
};
