import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import Product from '../Product';

export default function ListProducts(props) {
  const { newProduct } = props;
  const { title } = newProduct;

  const submitList = (item) => {
    axios.put('/api/new-list', { item }).then(() => console.log('success'));
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
  newProduct: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
