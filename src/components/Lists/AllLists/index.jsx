import { React } from 'react';
import PropTypes from 'prop-types';
import { listType } from '../../../types';
import SavedList from './SavedList';

export default function AllLists(props) {
  const { allLists, setNewList } = props;

  return (
    <section>
      <h1>AllLists</h1>
      {allLists.map((l) => (
        <SavedList
          list={l}
          key={l.id}
          setNewList={setNewList}
        />
      ))}
    </section>
  );
}

AllLists.propTypes = {
  allLists: PropTypes.arrayOf(listType).isRequired,
  setNewList: PropTypes.func.isRequired,
};
