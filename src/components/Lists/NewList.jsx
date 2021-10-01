import { React } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { listType } from '../../types';
import searchProducts from '../../helpers/search';

export default function NewList(props) {
  const { newList, setResults, setIdToReplace } = props;
  console.log('list', newList);

  const submitList = () => {
    const co2Saved = 0;
    // TODO: db insert should return all columns from new list creation
    // then we can update allLists state variable
    console.log('THIS IS NEW LIST :', newList);
    axios.put('/api/lists', { list: newList, co2Saved }).then(() => console.log('saved new list success'));
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
      {mappedList()}
      <button type="button" onClick={() => submitList()}>Save</button>
    </section>
  );
}

// declare the prop type for the ListProducts component
NewList.propTypes = {
  newList: listType.isRequired,
  setResults: PropTypes.func.isRequired,
  setIdToReplace: PropTypes.func.isRequired,
};
