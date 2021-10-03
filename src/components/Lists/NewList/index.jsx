/* eslint-disable max-len */
import { React } from 'react';
import PropTypes from 'prop-types';
import { listType } from '../../../types';
import searchProducts from '../../../helpers/search';
import NewListProduct from './NewListProduct';
import '../index-lists.scss';

export default function NewList(props) {
  const {
    newList, setResults, setIdToReplace, saveList, setNewList,
  } = props;
  console.log('list', newList);

  const removeProduct = (id) => {
    const newProducts = newList.products.reduce((plist, p) => {
      if (p.api_id === id) {
        return plist;
      }
      plist.push(p);
      return plist;
    }, []);

    setNewList((prev) => ({
      ...prev,
      products: newProducts,
    }));
  };

  const showReplacements = (query, title, id) => {
    const newQuery = title.toLowerCase().split(' ').filter((w) => w.includes(query.toLowerCase()))[0];
    console.log('newQueyr', newQuery);
    searchProducts(newQuery)
      .then((results) => {
        setIdToReplace(id);
        setResults(results);
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
        <p className="co2-saved-text">
          Your choices have saved
          <span className="co2-desc">
            {' '}
            {newList.co2_saved}
            {' '}
          </span>
          kg of CO2 so far!
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
      {newList.products.length ? <button className="save-btn" type="button" onClick={saveList}>Save</button> : <></>}
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
};
