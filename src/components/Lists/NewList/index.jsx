/* eslint-disable max-len */
import { React } from 'react';
import PropTypes from 'prop-types';
import { listType } from '../../../types';
import searchProducts from '../../../helpers/search';
import NewListProduct from './NewListProduct';

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

  const mappedList = () => {
    if (!newList.products.length) {
      console.log('no products yet');
      return <h3>No products added!</h3>;
    }
    return newList.products.map((p) => (
      <NewListProduct
        product={p}
        showReplacements={showReplacements}
        removeProduct={removeProduct}
        key={p.api_id}
      />
    ));
  };

  return (
    <section>
      <h1>New List</h1>
      <h3>
        Your choices have saved
        {' '}
        {newList.co2_saved}
        {' '}
        g of CO2 so far!
      </h3>
      {mappedList()}
      {newList.products.length ? <button type="button" onClick={saveList}>Save</button> : <></>}
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

// import { React } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import { productType } from '../../types';
// import productSearch from '../../helpers/search';
// import './index-lists.scss';

// export default function NewList(props) {
//   const { newList, setResults, setIdToReplace } = props;
//   console.log('list', newList);

//   const submitList = () => {
//     const co2Saved = 0;
//     // TODO: db insert should return all columns from new list creation
//     // then we can update allLists state variable
//     console.log('THIS IS NEW LIST :', newList);
//     axios.put('/api/lists', { list: newList, co2Saved }).then(() => console.log('saved new list success'));
//   };

//   const showReplacements = (query, title, id) => {
//     const newQuery = title.toLowerCase().split(' ').filter((w) => w.includes(query.toLowerCase()))[0];
//     console.log('newQueyr', newQuery);
//     productSearch(newQuery)
//       .then((results) => {
//         setIdToReplace(id);
//         setResults(results);
//       });
//   };

// const mappedList = newList.map((p) => (
//   <div className="item-in-list">
//     <div className="description">
//       <p className="main-desc" key={p.api_id}>{p.title}</p>
//     </div>
//     <div className="replace-btn-wrapper">
//       <p className="co2-desc">
//         {/* eslint-disable-next-line */}
//         CO2: <span>{p.co2}</span> g
//       </p>
//       <button className="btn-replace" type="button" onClick={() => showReplacements(p.query, p.title, p.api_id)}><a href="#search-results-container">Show replacements</a></button>
//     </div>
//   </div>
// ));
// console.log('mapped', mappedList);

//   return (
//     <section>
//       <h1>New List</h1>
//       <div>
//         {mappedList}
//       </div>
//       <button className="save-btn" type="button" onClick={() => submitList()}>Save</button>
//     </section>
//   );
// }

// // declare the prop type for the ListProducts component
// NewList.propTypes = {
//   newList: PropTypes.arrayOf(productType).isRequired,
//   setResults: PropTypes.func.isRequired,
//   setIdToReplace: PropTypes.func.isRequired,
// };
