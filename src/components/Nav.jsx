import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <Link to="/">
        <h3>Logo</h3>
      </Link>
      <ul className="nav-links">
        <Link to="/lists">
          <li>Lists</li>
        </Link>
        <Link to="/stats">
          <li>Stats</li>
        </Link>
      </ul>
    </nav>
  );
}
