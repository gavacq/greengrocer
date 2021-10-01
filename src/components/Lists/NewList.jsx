import { React } from 'react';
import PropTypes from 'prop-types';
import { listType } from '../../types';
import searchProducts from '../../helpers/search';

export default function NewList(props) {
  const {
    newList, setResults, setIdToReplace, saveList,
  } = props;
  console.log('list', newList);

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
    if (!newList.products) {
      console.log('no products yet');
      return <h3>No products added!</h3>;
    }
    return newList.products.map((p) => (
      <div key={p.api_id}>
        <p>{p.title}</p>
        <p>{p.co2}</p>
        <button type="button" onClick={() => showReplacements(p.query, p.title, p.api_id)}>Show Replacements</button>
      </div>
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
      <button type="button" onClick={saveList}>Save</button>
    </section>
  );
}

// declare the prop type for the ListProducts component
NewList.propTypes = {
  newList: listType.isRequired,
  setResults: PropTypes.func.isRequired,
  setIdToReplace: PropTypes.func.isRequired,
  saveList: PropTypes.func.isRequired,
};
