import { React } from 'react';
import PropTypes from 'prop-types';
import { listType } from '../../../types';
import SavedList from './SavedList';
import '../index-lists.scss';

export default function AllLists(props) {
  const { allLists, setNewList, deleteList } = props;
  console.log('AllLists', allLists);

  const showAllLists = () => {
    if (!allLists.length) {
      return <p className="co2-saved-text">You have no saved lists!</p>;
    }

    return (
      allLists.map((l) => (
        <SavedList
          key={l.id}
          list={l}
          setNewList={setNewList}
          deleteList={deleteList}
        />
      ))
    );
  };

  return (
    <section className="all-lists-wrapper">
      <h1 className="my-lists">My lists</h1>
      {showAllLists()}
    </section>
  );
}

AllLists.propTypes = {
  allLists: PropTypes.arrayOf(listType).isRequired,
  setNewList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};
