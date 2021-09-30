// https://spoonacular.com/productImages/12003-312x231.jpeg

import { React } from 'react';
import PropTypes from 'prop-types';
import Product from '../../Product';
import { productType } from '../../../types';

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
  results: PropTypes.arrayOf(productType).isRequired,
  setNewList: PropTypes.func.isRequired,
};
