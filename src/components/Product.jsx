import { React } from 'react';
import PropTypes from 'prop-types';

export default function Product(props) {
  const { title, id, image } = props;
  console.log('image', image);
  return (
    <div id={id}>
      <p>{title}</p>
      <img src={image} alt="product" />
    </div>

  );
}

// declare the prop type for the Product component
Product.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
