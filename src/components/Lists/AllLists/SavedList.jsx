import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { listType } from '../../../types';
import { useAppContext } from '../../../lib/context';

export default function SavedList(props) {
  const { list, setNewList, deleteList } = props;
  const { postsContext } = useAppContext();
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = postsContext;

  const copyHandler = () => {
    setNewList(({
      ...list,
      co2_saved: 0,
    }));
  };

  const shareHandler = () => {
    const post = {
      message: 'You saved 10 seals worth of co2!',
    };
    axios.put('/api/posts', { post })
      .then((res) => {
        post.id = res.data.id;
        post.user_id = res.data.user_id;
        setPosts((prev) => ([
          ...prev,
          post,
        ]));
      });
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
      <button type="button" onClick={() => deleteList(list.id)}>Delete</button>
      <button type="button" onClick={copyHandler}>Copy</button>
      <button type="button" onClick={shareHandler}>Share</button>
    </ul>
  );
}

SavedList.propTypes = {
  list: listType.isRequired,
  setNewList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};
