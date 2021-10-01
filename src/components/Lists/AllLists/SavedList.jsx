import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { listType } from '../../../types';

export default function SavedList({ list, setNewList }) {
  const deleteHandler = () => {
    axios.delete(`/api/lists/${list.id}`)
      .then(() => {
        console.log('success');
      });
  };

  const copyHandler = () => {
    setNewList(list);
  };

  const shareHandler = () => {

  };

  const mappedListItems = list.products.map((p) => (
    <li key={p.api_id}>
      <p>{p.title}</p>
    </li>
  ));
  return (
    <ul>
      <h1>{list.id}</h1>
      {mappedListItems}
      <button type="button" onClick={deleteHandler}>Delete</button>
      <button type="button" onClick={copyHandler}>Copy</button>
      <button type="button" onClick={shareHandler}>Share</button>
    </ul>
  );
}

SavedList.propTypes = {
  list: listType.isRequired,
  setNewList: PropTypes.func.isRequired,
};
