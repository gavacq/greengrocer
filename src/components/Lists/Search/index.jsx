import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { listType, productType } from '../../../types';
import { useAppContext } from '../../../lib/context';

export default function Search(props) {
  const {
    newList, setNewList, results, setResults, replaceProduct,
    idToReplace, setIdToReplace, setQueryDisplay, queryDisplay,
  } = props;
  const { resultsReturnedContext } = useAppContext();
  const [resultsReturned] = resultsReturnedContext;
  const [productName, setProductName] = useState('');

  return (
    <section className="search-wrapper">
      <SearchBar
        newList={newList}
        setResults={setResults}
        setIdToReplace={setIdToReplace}
        productName={productName}
        setProductName={setProductName}
        setQueryDisplay={setQueryDisplay}
      />
      {
        !resultsReturned
        && (
        <Loader
          type="ThreeDots"
          color="#73d99c"
          height={100}
          width={100}
        />
        )
      }

      {results.length > 0 && resultsReturned
        && (
        <SearchResults
          id="search-results-container"
          results={results}
          setResults={setResults}
          setNewList={setNewList}
          replaceProduct={replaceProduct}
          idToReplace={idToReplace}
          productName={productName}
          setProductName={setProductName}
          queryDisplay={queryDisplay}
        />
        )}
    </section>
  );
}

Search.propTypes = {
  newList: listType.isRequired,
  setNewList: PropTypes.func.isRequired,
  setResults: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(productType).isRequired,
  replaceProduct: PropTypes.func.isRequired,
  idToReplace: PropTypes.number,
  setIdToReplace: PropTypes.func.isRequired,
  queryDisplay: PropTypes.string.isRequired,
  setQueryDisplay: PropTypes.func.isRequired,
};

// Specifies the default values for props:
Search.defaultProps = {
  idToReplace: 0,
};
