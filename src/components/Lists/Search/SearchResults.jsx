// https://spoonacular.com/productImages/12003-312x231.jpeg

import { React } from 'react';
import PropTypes from 'prop-types';
import Product from '../../Product';

export default function SearchResults(props) {
  const { results, setNewList } = props;
  console.log('results', results);

  const addProductToList = (product) => {
    setNewList((prev) => ([
      ...prev,
      product,
    ]));
  };

  const jsxResults = results.map((result) => (
    <Product
      key={result.api_id}
      data={result}
      addProductToList={addProductToList}
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
    api_id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    cO2: PropTypes.number,
    lat: PropTypes.number,
    long: PropTypes.number,
  })).isRequired,
  setNewList: PropTypes.func.isRequired,
};
