import PropTypes from 'prop-types';

const productType = PropTypes.shape({
  api_id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  co2: PropTypes.number,
  lat: PropTypes.number,
  long: PropTypes.number,
  query: PropTypes.string,
});

const listType = PropTypes.shape({
  id: PropTypes.number,
  date_created: PropTypes.string,
  co2_saved: PropTypes.number,
  products: PropTypes.arrayOf(productType),
});

export {
  productType,
  listType,
};
