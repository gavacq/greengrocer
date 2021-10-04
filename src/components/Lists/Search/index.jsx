import { React, useEffect, useState } from 'react';
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
  const [resultsReturned, setResultsReturned] = resultsReturnedContext;
  const [productName, setProductName] = useState('');
  const [showResults, setShowResults] = useState(true);

  console.log('resultsReturned', resultsReturned);

  useEffect(() => {
    setResultsReturned((prev) => ({ ...prev, initial: true }));
  }, []);

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
        !resultsReturned.returned
        && (
        <Loader
          type="ThreeDots"
          color="#73d99c"
          height={100}
          width={100}
        />
        )
      }

      {
        !resultsReturned.initial && resultsReturned.returned
          && (
          <SearchResults
            className={showResults ? '' : 'hide-results'}
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
          )
      }
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
