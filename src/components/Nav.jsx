import React from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div className="nav-container">
      <div className="wrapper">
        <nav>
          <Link to="/">
            <div className="logo">Logo</div>
          </Link>
          <ul className="nav-links">
            <Link to="/lists">
              <li className="desktop-menu-item">Lists</li>
            </Link>
            <Link to="/stats">
              <li className="desktop-menu-item">Stats</li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}
