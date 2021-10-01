import { React } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { productType } from '../../../types';

export default function Search(props) {
  const {
    setNewList, results, setResults, replaceProduct, idToReplace, setIdToReplace,
  } = props;
  return (
    <section>
      <SearchBar setResults={setResults} setIdToReplace={setIdToReplace} />
      {results.length > 0
        && (
        <SearchResults
          results={results}
          setNewList={setNewList}
          replaceProduct={replaceProduct}
          idToReplace={idToReplace}
        />
        )}
      {/* {results.length === 0 && <p>No results found.</p>} */}
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
