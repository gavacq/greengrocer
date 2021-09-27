import React from 'react';
import './App.css';
// import './Nav.scss';
// import './Nav.css';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div className="nav-container">
      <div className="wrapper">
        <nav>
          <Link to="/" className="logo-link">
            <div className="logo">GreenGrocer</div>
          </Link>
          <ul className="desktop-menu">
            <Link to="/lists" className="desktop-menu-item">
              <li>Lists</li>
            </Link>
            <Link to="/stats" className="desktop-menu-item">
              <li>Stats</li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}
