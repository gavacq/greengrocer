/* eslint-disable */

import { React } from 'react';
import PropTypes from 'prop-types';
import '../index.scss';
import './Products.scss';
import './App.scss';
import useWindowSize from '../hooks/useWindowSize';

export default function Product(props) {
  const [height, width] = useWindowSize(); // window size
  const {
    title, id, image, upc, setNewProduct,
  } = props;
  console.log('image', image);
  return (
    <div id={id} className="product-flexbox">

      <div className="img-btn-container">

        <div className="product-img">
          <img src={image} alt="product" className="product" />
        </div>

        <button
          className="add-btn"
          type="button"
          aria-label="setNewProduct"
          onClick={() => {
            setNewProduct({
              title, id, image,
            });
          }}
        >
          <span>{width <= 720 ? '+' : 'Add to list' }</span>
        </button>

      </div>

      <div><p>{title}</p></div>

    </div>
  );
}

// declare the prop type for the Product component
Product.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  upc: PropTypes.number.isRequired,
  setNewProduct: PropTypes.func,
};

// Specifies the default values for props:
Product.defaultProps = {
  setNewProduct: () => {},
};
