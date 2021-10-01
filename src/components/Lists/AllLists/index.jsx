import { React } from 'react';
import PropTypes from 'prop-types';
import { listType } from '../../../types';
import SavedList from './SavedList';

export default function AllLists(props) {
  const { allLists, setNewList, deleteList } = props;
  console.log('AllLists', allLists);

  const showAllLists = () => {
    if (!allLists.length) {
      return <h3>You have no saved lists!</h3>;
    }

    return (
      allLists.map((l) => (
        <SavedList
          list={l}
          key={l.id}
          setNewList={setNewList}
          deleteList={deleteList}
        />
      ))
    );
  };

  return (
    <section>
      <h1>AllLists</h1>
      {showAllLists()}
    </section>
  );
}

AllLists.propTypes = {
  allLists: PropTypes.arrayOf(listType).isRequired,
  setNewList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};
