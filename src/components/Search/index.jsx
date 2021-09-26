import { React, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default function Search() {
  const [results, setResults] = useState([]);
  console.log('results in Search: ', results);
  return (
    <section>
      <SearchBar setResults={setResults} />
      {results.length > 0 && <SearchResults results={results} />}
    </section>
  );
}
