// https://spoonacular.com/productImages/12003-312x231.jpeg

import { React } from 'react';
import PropTypes from 'prop-types';

export default function SearchResults(props) {
  const { results } = props;
  const jsxResults = results.map((result) => <p>{result.title}</p>);
  return (
    <div>
      {jsxResults}
    </div>
  );
}

// results: PropTypes.arrayOf(PropTypes.shape({

// }))
// declare the prop type for the SearchBar component
SearchResults.propTypes = {
  results: PropTypes.array.isRequired, // eslint-disable-line
};
