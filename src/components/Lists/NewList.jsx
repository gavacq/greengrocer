import React from 'react';
import PropTypes from 'prop-types';
// import Product from '../Product';

export default function ListProducts(props) {
  const { newProduct } = props;
  const { title } = newProduct;
  console.log('newProduct', newProduct);
  return (
    <section>
      <h1>New list</h1>
      {title}
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
