import React from 'react';
import PropTypes from 'prop-types';
import { productType } from '../../../types';

export default function NewListProduct(props) {
  const { product, showReplacements } = props;
  return (
    <div key={product.api_id}>
      <p>{product.title}</p>
      <p>{product.co2}</p>
      <button type="button" onClick={() => showReplacements(product.query, product.title, product.api_id)}>Show Replacements</button>
    </div>
  );
}

NewListProduct.propTypes = {
  product: productType.isRequired,
  showReplacements: PropTypes.func.isRequired,
};
