import { React } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import Product from '../../Product';
import { productType } from '../../../types';
import '../index-lists.scss';
import { removeProductFromList } from '../../../helpers/search';
import { useAppContext } from '../../../lib/context';

export default function SearchResults(props) {
  const {
    results, setResults, setNewList, replaceProduct, idToReplace, queryDisplay,
  } = props;
  const { resultsReturnedContext } = useAppContext();
  const [resultsReturned] = resultsReturnedContext;

  const addProductToList = (product) => {
    setNewList((prev) => ({
      id: prev.id,
      date_created: prev.date_created,
      co2_saved: prev.co2_saved || 0,
      products: prev.products ? [...prev.products, product] : [product],
    }));

    const filteredResults = removeProductFromList(results, product.api_id);
    setResults(filteredResults);
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
      {/* eslint-disable-next-line */}
      {
        !resultsReturned
        && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
        )
      }
      <p className="query-result-msg">
        <em>
          showing results for:
          {' '}
          {queryDisplay}
        </em>
      </p>
      {jsxResults}
    </div>
  );
}

// declare the prop type for the SearchResults component
SearchResults.propTypes = {
  results: PropTypes.arrayOf(productType).isRequired,
  setResults: PropTypes.func.isRequired,
  setNewList: PropTypes.func.isRequired,
  replaceProduct: PropTypes.func.isRequired,
  idToReplace: PropTypes.number,
  queryDisplay: PropTypes.string.isRequired,
};

SearchResults.defaultProps = {
  idToReplace: 0,
};
