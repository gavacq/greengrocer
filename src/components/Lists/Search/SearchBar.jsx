import { React } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';
import '../../../index.scss';
import { searchProducts, filterDuplicateProductsFromResults } from '../../../helpers/search';
import { listType } from '../../../types';

export default function SearchBar(props) {
  const {
    newList, setResults, setIdToReplace, productName, setProductName, setQueryDisplay,
  } = props;

  const clickHandler = () => {
    searchProducts(productName).then((results) => {
      const dedupedResults = filterDuplicateProductsFromResults(results, newList);
      setResults(dedupedResults);
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
  newList: listType.isRequired,
  setResults: PropTypes.func.isRequired,
  setIdToReplace: PropTypes.func.isRequired,
  setProductName: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
  setQueryDisplay: PropTypes.func.isRequired,
};
