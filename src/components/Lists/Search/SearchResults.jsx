// https://spoonacular.com/productImages/12003-312x231.jpeg

import { React } from 'react';
import PropTypes from 'prop-types';
import Product from '../../Product';
import { productType } from '../../../types';
import '../index-lists.scss';

export default function SearchResults(props) {
  const {
    results, setNewList, replaceProduct, idToReplace, queryDisplay,
  } = props;
  console.log('results', results);

  const addProductToList = (product) => {
    setNewList((prev) => ({
      id: prev.id,
      date_created: prev.date_created,
      co2_saved: prev.co2_saved || 0,
      products: prev.products ? [...prev.products, product] : [product],
    }));
  };

  const jsxResults = results.map((result) => (
    <div>
      <Product
        key={result.api_id}
        data={result}
        addProductToList={addProductToList}
        replaceProduct={replaceProduct}
        idToReplace={idToReplace}
      />
    </div>
  ));

  return (
    <div>
      {/* eslint-disable-next-line */}
      <p className="query-result-msg"><em>showing results for: {queryDisplay}</em></p>
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
  queryDisplay: PropTypes.string.isRequired,
};

SearchResults.defaultProps = {
  idToReplace: 0,
};
