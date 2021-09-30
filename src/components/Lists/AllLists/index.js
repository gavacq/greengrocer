import { React } from 'react';
import PropTypes from 'prop-types';

export default function AllLists(props) {
  const { allLists, setEditable, setNewList } = props;
  return (
    <section>
      <h1>AllLists</h1>
    </section>
  );
}

AllLists.propTypes = {
  setNewList: PropTypes.func.isRequired,
};
