/* eslint-disable */

import React, { useState, useLayoutEffect } from 'react';
import './Nav.scss';
import '../index.scss';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [navColor, setNavColor] = useState(false); // navbar color

  // change navbar color on scroll
  const changeNavColor = () => {
    if (window.scrollY >= 90) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };

  window.addEventListener('scroll', changeNavColor);
 

  return (
    <div className={navColor ? 'nav-container sticky active' : 'nav-container sticky'}>
      <div className="wrapper">
        <nav>
          <Link to="/" className="logo-link">
            <div className="logo">GG</div>
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
