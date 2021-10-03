import { React } from 'react';
import PropTypes from 'prop-types';
import '../index.scss';
import './Products.scss';
import './App.scss';
import './Lists/index-lists.scss';
import useWindowSize from '../hooks/useWindowSize';
import { productType } from '../types';

export default function Product(props) {
  const [height, width] = useWindowSize(); // eslint-disable-line
  const {
    data, addProductToList, replaceProduct, idToReplace,
  } = props;

  const actionButton = () => {
    if (idToReplace) {
      return (
        <button
          className="green-btn"
          type="button"
          onClick={() => replaceProduct(data)}
        >
          <span>Replace</span>
        </button>
      );
    }
    return (
      <button
        className="add-btn"
        type="button"
        aria-label="setNewProduct"
        onClick={() => {
          addProductToList(data);
        }}
      >
        <span>{width <= 820 ? '+' : 'Add to list' }</span>
      </button>
    );
  };

  return (
    <div data-product-id={data.api_id} className="product-flexbox">
      <div className="img-btn-container">

        <div className="product-img">
          <img src={data.image} alt="product" className="product" />
          <p>{data.co2}</p>
        </div>
        {actionButton()}
      </div>

      <div><p>{data.title}</p></div>

    </div>
  );
}

// declare the prop type for the Product component
Product.propTypes = {
  data: productType.isRequired,
  addProductToList: PropTypes.func,
  replaceProduct: PropTypes.func,
  idToReplace: PropTypes.number,
};

// Specifies the default values for props:
Product.defaultProps = {
  addProductToList: () => {},
  replaceProduct: () => {},
  idToReplace: 0,
};
