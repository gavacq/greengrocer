// https://spoonacular.com/productImages/12003-312x231.jpeg

import { React } from 'react';
import PropTypes from 'prop-types';
import Product from '../Product';

export default function SearchResults(props) {
  const { results } = props;
  console.log('results', results);
  const jsxResults = results.map((result) => (
    <Product
      id={result.id}
      image={result.image}
      title={result.title}
    />
  ));

  return (
    <div>
      {jsxResults}
    </div>
  );
}

// results: PropTypes.arrayOf(PropTypes.shape({

// }))

// declare the prop type for the SearchResults component
SearchResults.propTypes = {
  results: PropTypes.array.isRequired, // eslint-disable-line
};
