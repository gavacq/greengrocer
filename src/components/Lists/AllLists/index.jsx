import { React } from 'react';
import PropTypes from 'prop-types';
import { listType } from '../../../types';
import SavedList from './SavedList';

export default function AllLists(props) {
  const { allLists, setEditable, setNewList } = props;
  console.log(allLists, setEditable, setNewList);

  return (
    <section>
      <h1>AllLists</h1>
      {allLists.map((l) => (
        <SavedList
          list={l}
          key={l.id}
        />
      ))}
    </section>
  );
}

AllLists.propTypes = {
  allLists: PropTypes.arrayOf(listType).isRequired,
  setEditable: PropTypes.func.isRequired,
  setNewList: PropTypes.func.isRequired,
};
