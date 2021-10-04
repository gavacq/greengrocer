import { React } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';
import '../../../index.scss';
import { searchProducts, filterDuplicateProductsFromResults } from '../../../helpers/search';
import { listType } from '../../../types';
import { useAppContext } from '../../../lib/context';

export default function SearchBar(props) {
  const {
    newList, setResults, setIdToReplace, productName, setProductName, setQueryDisplay,
  } = props;
  const { resultsReturnedContext } = useAppContext();
  // eslint-disable-next-line no-unused-vars
  const [resultsReturned, setResultsReturned] = resultsReturnedContext;

  const clickHandler = () => {
    setResultsReturned((prev) => ({
      ...prev,
      returned: false,
      initial: false,
    }));
    searchProducts(productName)
      .then((results) => {
        const dedupedResults = filterDuplicateProductsFromResults(results, newList);
        setResults(dedupedResults);
        setIdToReplace(null);
        setQueryDisplay(productName);
        setResultsReturned((prev) => ({
          ...prev,
          empty: results.length === 0,
          returned: true,
        }));
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
