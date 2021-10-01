// https://spoonacular.com/productImages/12003-312x231.jpeg

import { React } from 'react';
import PropTypes from 'prop-types';
import Product from '../../Product';
import { productType } from '../../../types';

export default function SearchResults(props) {
  const {
    results, setNewList, replaceProduct, idToReplace,
  } = props;
  console.log('results', results);

  const addProductToList = (product) => {
    setNewList((prev) => ({
      list_id: prev.list_id,
      date_created: prev.date_created,
      co2_saved: prev.co2_saved || 0,
      products: prev.products ? [...prev.products, product] : [product],
    }));
  };

  const jsxResults = results.map((result) => (
    <Product
      key={result.api_id}
      data={result}
      addProductToList={addProductToList}
      replaceProduct={replaceProduct}
      idToReplace={idToReplace}
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
  replaceProduct: PropTypes.func.isRequired,
  idToReplace: PropTypes.number,
};

SearchResults.defaultProps = {
  idToReplace: 0,
};
