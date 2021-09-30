import React from 'react';
import Earth from './Earth';

export default function Stats() {
  // on page load get all lists from db

  return (
    <section>
      <div className="stats-container">
        <Earth />
      </div>
    </section>
  );
}
