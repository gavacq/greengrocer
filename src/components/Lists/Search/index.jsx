import { React, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default function Search(props) {
  const { setNewList } = props;
  const [results, setResults] = useState([]);
  console.log('results in Search: ', results);
  return (
    <section>
      <SearchBar setResults={setResults} />
      {results.length > 0 && <SearchResults results={results} setNewList={setNewList} />}
      {/* {results.length === 0 && <p>No results found.</p>} */}
    </section>
  );
}

Search.propTypes = {
  setNewList: PropTypes.func.isRequired,
};
