import { React, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { productType } from '../../../types';

export default function Search(props) {
  const {
    setNewList, results, setResults, replaceProduct, idToReplace, setIdToReplace,
  } = props;

  const [productName, setProductName] = useState('');
  const [queryDisplay, setQueryDisplay] = useState('');

  return (
    <section className="search-wrapper">
      <SearchBar
        setResults={setResults}
        setIdToReplace={setIdToReplace}
        productName={productName}
        setProductName={setProductName}
        setQueryDisplay={setQueryDisplay}
      />
      {results.length > 0
        && (
        <SearchResults
          id="search-results-container"
          results={results}
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
  setNewList: PropTypes.func.isRequired,
  setResults: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(productType).isRequired,
  replaceProduct: PropTypes.func.isRequired,
  idToReplace: PropTypes.number,
  setIdToReplace: PropTypes.func.isRequired,
};

// Specifies the default values for props:
Search.defaultProps = {
  idToReplace: 0,
};
