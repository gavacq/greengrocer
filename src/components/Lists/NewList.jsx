import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function NewList(props) {
  const { list } = props;
  console.log('list', list);

  const submitList = (newList) => {
    axios.put('/api/lists/new', { newList }).then(() => console.log('success'));
  };

  const mappedList = list.map((item) => <p key={item.id}>{item.title}</p>);
  console.log('mapped', mappedList);

  return (
    <section>
      <h1>New List</h1>
      {mappedList}
      <button type="button" onClick={() => submitList(list)}>Save</button>
    </section>
  );
}

// declare the prop type for the ListProducts component
NewList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
};
