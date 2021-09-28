import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function ListProducts(props) {
  const { list } = props;
  const { title } = list;

  const submitList = (item) => {
    axios.put('/api/lists/new', { item }).then(() => console.log('success'));
  };

  return (
    <section>
      <h1>New List</h1>
      <p>{title}</p>
      <button type="button" onClick={() => submitList(title)}>Save</button>
    </section>
  );
}

// declare the prop type for the ListProducts component
ListProducts.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
