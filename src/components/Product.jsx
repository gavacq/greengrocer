import { React } from 'react';
import PropTypes from 'prop-types';
import '../index.scss';
import './Products.scss';
import './App.scss';

export default function Product(props) {
  const {
    title, id, image, setNewProduct,
  } = props;
  console.log('image', image);
  return (
    <div id={id}>
      <div className="product-img">
        <img src={image} alt="product" />
      </div>
      <p>{title}</p>
      <button
        type="button"
        aria-label="setNewProduct"
        onClick={() => {
          setNewProduct({
            title, id, image,
          });
        }}
      >
        +
      </button>
    </div>
  );
}

// declare the prop type for the Product component
Product.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  setNewProduct: PropTypes.func,
};

// Specifies the default values for props:
Product.defaultProps = {
  setNewProduct: () => {},
};
