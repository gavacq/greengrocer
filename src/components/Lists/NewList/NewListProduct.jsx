import React from 'react';
import PropTypes from 'prop-types';
import { productType } from '../../../types';

export default function NewListProduct(props) {
  const { product, showReplacements, removeProduct } = props;
  return (
    <div className="item-in-list">
      <div className="description">
        <p className="main-desc" key={product.api_id}>{product.title}</p>
      </div>
      <div className="replace-btn-wrapper">
        <p className="co2-desc">
          {/* eslint-disable-next-line */}
          CO2: <span>{product.co2}</span> kg
        </p>
        <div className="btn-flexbox">
          <button
            className="btn-remove"
            type="button"
            onClick={() => removeProduct(product.api_id)}
          >
            Remove
          </button>
          <button
            className="btn-replace"
            type="button"
            onClick={() => showReplacements(product.query, product.title, product.api_id)}
          >
            Show replacements
          </button>
        </div>
      </div>
    </div>
  );
}

NewListProduct.propTypes = {
  product: productType.isRequired,
  showReplacements: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
};
