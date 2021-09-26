// https://spoonacular.com/productImages/12003-312x231.jpeg

import { React } from 'react';
import PropTypes from 'prop-types';
import Product from '../../Product';

export default function SearchResults(props) {
  const { results, setNewProduct } = props;
  console.log('results', results);
  const jsxResults = results.map((result) => (
    <Product
      key={result.id}
      id={result.id}
      image={result.image}
      title={result.title}
      setNewProduct={setNewProduct}
    />
  ));

  return (
    <div>
      {jsxResults}
    </div>
  );
}

// declare the prop type for the SearchResults component
SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  setNewProduct: PropTypes.func.isRequired,
};
