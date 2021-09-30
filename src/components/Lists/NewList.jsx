import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { productType } from '../../types';

export default function NewList(props) {
  const { newList } = props;
  console.log('list', newList);

  const submitList = () => {
    const co2Saved = 0;
    // TODO: db insert should return all columns from new list creation
    // then we can update allLists state variable
    axios.put('/api/lists', { list: newList, co2Saved }).then(() => console.log('saved new list success'));
  };

  const mappedList = newList.map((product) => <p key={product.api_id}>{product.title}</p>);
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
};
