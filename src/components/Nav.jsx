import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Nav() {
  const navStyle = {
    color: 'white',
  };
  return (
    <nav>
      <Link to="/" style={navStyle}>
        <h3>Logo</h3>
      </Link>
      <ul className="nav-links">
        <Link to="/lists" style={navStyle}>
          <li>Lists</li>
        </Link>
        <Link to="/stats" style={navStyle}>
          <li>Stats</li>
        </Link>
        <Link to="/login" style={navStyle}>
          <li>Login</li>
        </Link>
      </ul>
    </nav>
  );
}
