import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { listType } from '../../../types';
import { useAppContext } from '../../../lib/context';
import socket from '../../../helpers/socket';

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

  const generateMesssage = (co2) => {
    console.log('co2 in generateMessage', co2);
    switch (Math.floor((Math.random() * 100) % 5)) {
      case 0:
        // cups of coffee
        return `I saved ${co2} kg of CO2. That's like washing and drying ${(co2 / 2.4)} loads of laundry!`;
      case 1:
        // airplane
        return `I saved ${co2} kg of CO2. That's like flying in economy class for ${(co2 / 110)} hours!`;
      case 2:
        // car
        return `I saved ${co2} kg of CO2. That's like driving ${(co2 / 0.28)} km in a typical passenger vehicle!`;
      case 3:
        // hours of watching netflix
        return `I saved ${co2} kg of CO2. That's like ${(co2 / 10)} hours of watching Netflix in HD!`;
      case 4:
        // trees equivalent
        return `I saved ${co2} kg of CO2. An average tree takes ${(co2 / 25)} years to remove that much CO2 from the atmosphere!`;
      default:
        return 'ERROR: oops';
    }
  };

  const shareHandler = () => {
    const post = {
      message: generateMesssage(list.co2_saved),
    };
    axios.put('/api/posts', { post })
      .then((res) => {
        const newPost = { ...res.data, likedByUser: false };
        console.log('newPost', newPost);
        setPosts((prev) => ([
          ...prev,
          newPost,
        ]));

        socket.emit('shareList', newPost);
      });
  };

  const mappedListItems = list.products.map((p) => (
    <li key={p.api_id}>
      <p>{p.title}</p>
    </li>
  ));
  return (
    <div className="saved-list">
      {/* eslint-disable-next-line */}
      <h3>List #{list.id}</h3>
      {mappedListItems}
      <div className="buttons-flexbox">
        <button className="delete-btn" type="button" onClick={() => deleteList(list.id)}>delete</button>
        <button className="copy-btn" type="button" onClick={copyHandler}>copy</button>
        <button className="share-btn" type="button" onClick={shareHandler}>share</button>
      </div>
    </div>
  );
}

SavedList.propTypes = {
  list: listType.isRequired,
  setNewList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};
