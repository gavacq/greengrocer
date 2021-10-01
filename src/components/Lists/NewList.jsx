import { React, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { productType } from '../../types';
import productSearch from '../../helpers/search';

export default function NewList(props) {
  const [replacing, setReplacing] = useState(false);
  const { newList, setResults } = props;
  console.log('list', newList);

  const submitList = () => {
    const co2Saved = 0;
    // TODO: db insert should return all columns from new list creation
    // then we can update allLists state variable
    console.log('THIS IS NEW LIST :', newList);
    axios.put('/api/lists', { list: newList, co2Saved }).then(() => console.log('saved new list success'));
  };

  const showReplacements = (query, title) => {
    const newQuery = title.toLowerCase().split(' ').filter((w) => w.includes(query.toLowerCase()))[0];
    console.log('newQueyr', newQuery);
    productSearch(newQuery)
      .then((results) => {
        setResults(results);
      });
    setReplacing((prev) => !prev);
  };

  const mappedList = newList.map((product) => (
    <div>
      <p key={product.api_id}>{product.title}</p>
      <p>{product.co2}</p>
      <button type="button" onClick={() => showReplacements(product.query, product.title)}>Edit</button>
      {replacing && <p>{product.query}</p>}
    </div>
  ));
  console.log('mapped', mappedList);

  return (
    <section>
      <h1>New List</h1>
      {mappedList}
      <button type="button" onClick={() => submitList()}>Save</button>
    </section>
  );
}

// declare the prop type for the ListProducts component
NewList.propTypes = {
  newList: PropTypes.arrayOf(productType).isRequired,
  setResults: PropTypes.func.isRequired,
};
