import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function NewList(props) {
  const { newList, editable } = props;
  console.log('list', newList);

  const submitList = () => {
    const cO2Saved = 0;
    // TODO: db insert should return all columns from new list creation
    // then we can update allLists state variable
    if (!editable) {
      axios.put('/api/lists', { list: newList, cO2Saved }).then(() => console.log('saved new list success'));
    } else {
      axios.patch('/api/lists', { list: newList, cO2Saved }).then(() => {
        console.log('edited new list success');
      });
    }
  };

  const mappedList = newList.map((product) => <p key={product.api_id}>{product.title}</p>);
  console.log('mapped', mappedList);

  return (
    <section>
      <h1>New List</h1>
      {mappedList}
      <button type="button" onClick={() => submitList()}>Save</button>
    </section>
  );
}

// declare the prop type for the ListProducts component
NewList.propTypes = {
  newList: PropTypes.arrayOf(PropTypes.shape({
    api_id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    cO2: PropTypes.number,
    lat: PropTypes.number,
    long: PropTypes.number,
  })).isRequired,
  editable: PropTypes.bool.isRequired,
};
