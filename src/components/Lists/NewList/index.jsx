/* eslint-disable max-len */
import { React } from 'react';
import PropTypes from 'prop-types';
import { listType } from '../../../types';
import { searchProducts, filterDuplicateProductsFromResults, removeProductFromList } from '../../../helpers/search';
import NewListProduct from './NewListProduct';
import '../index-lists.scss';
import { useAppContext } from '../../../lib/context';

export default function NewList(props) {
  const {
    newList, setResults, setIdToReplace, saveList, setNewList, setQueryDisplay, idToReplace,
  } = props;
  const { userContext } = useAppContext();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = userContext;

  const removeProduct = (id) => {
    const newProducts = removeProductFromList(newList.products, id);
    console.log('removeProduct', newProducts);

    setNewList((prev) => ({
      ...prev,
      products: newProducts,
    }));

    if (id === idToReplace) {
      setResults([]);
    }
  };

  const showReplacements = (query, title, id) => {
    const newQuery = title.toLowerCase().split(' ').filter((w) => w.includes(query.toLowerCase()))[0];
    console.log('newQuery', newQuery);
    searchProducts(newQuery)
      .then((results) => {
        setIdToReplace(id);
        const dedupedResults = filterDuplicateProductsFromResults(results, newList);
        setResults(dedupedResults);
        setQueryDisplay(newQuery);
      });
  };

  const newListContents = () => {
    if (!newList.products.length) {
      console.log('no products yet');
      return (
        <div className="no-products-yet">
          <p>
            <em>
              You have no products yet.
            </em>
          </p>
        </div>
      );
    }

    const mappedList = newList.products.map((p) => (
      <NewListProduct
        product={p}
        showReplacements={showReplacements}
        removeProduct={removeProduct}
        key={p.api_id}
      />
    ));

    return (
      <>
        <p className="co2-saved-text co2">
          Your choices have saved
          <span className="co2-desc">
            {' '}
            {newList.co2_saved}
            {' '}
          </span>
          kg of CO₂ so far!
        </p>
        {mappedList}
      </>
    );
  };

  return (
    <section className="new-list-wrapper">
      <h1>New list</h1>
      <div>
        {newListContents()}
      </div>
      {(newList.products.length && user.auth) ? <button className="save-btn" type="button" onClick={saveList}>Save</button> : <></>}
    </section>
  );
}

// declare the prop type for the ListProducts component
NewList.propTypes = {
  newList: listType.isRequired,
  setResults: PropTypes.func.isRequired,
  setIdToReplace: PropTypes.func.isRequired,
  saveList: PropTypes.func.isRequired,
  setNewList: PropTypes.func.isRequired,
  idToReplace: PropTypes.number,
  setQueryDisplay: PropTypes.func.isRequired,
};

NewList.defaultProps = {
  idToReplace: null,
};
