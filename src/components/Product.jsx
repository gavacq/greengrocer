import { React } from 'react';
import PropTypes from 'prop-types';
import '../index.scss';
import './Products.scss';
import './App.scss';
import useWindowSize from '../hooks/useWindowSize';

export default function Product(props) {
  const [height, width] = useWindowSize(); // eslint-disable-line
  const {
    data, addProductToList,
  } = props;
  return (
    <div data-product-id={data.api_id} className="product-flexbox">
      <div className="img-btn-container">

        <div className="product-img">
          <img src={data.image} alt="product" className="product" />
        </div>

        <button
          className="add-btn"
          type="button"
          aria-label="setNewProduct"
          onClick={() => {
            addProductToList(data);
          }}
        >
          <span>{width <= 720 ? '+' : 'Add to list' }</span>
        </button>

      </div>

      <div><p>{data.title}</p></div>

    </div>
  );
}

// declare the prop type for the Product component
Product.propTypes = {
  data: PropTypes.shape({
    api_id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    cO2: PropTypes.number,
    lat: PropTypes.number,
    long: PropTypes.number,
  }).isRequired,
  addProductToList: PropTypes.func,
};

// Specifies the default values for props:
Product.defaultProps = {
  addProductToList: () => {},
};
