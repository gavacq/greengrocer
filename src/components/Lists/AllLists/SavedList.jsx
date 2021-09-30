import React from 'react';
import axios from 'axios';
import { listType } from '../../../types';

export default function SavedList({ list }) {
  const deleteHandler = () => {
    axios.delete(`/api/lists/${list.id}`)
      .then(() => {
        console.log('success');
      });
  };

  const editHandler = () => {

  };

  const copyHandler = () => {

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
      <button type="button" onClick={editHandler}>Edit</button>
      <button type="button" onClick={copyHandler}>Copy</button>
      <button type="button" onClick={shareHandler}>Share</button>
    </ul>
  );
}

SavedList.propTypes = {
  list: listType.isRequired,
};
