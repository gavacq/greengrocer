/* eslint-disable */

import React, { useState, useLayoutEffect } from 'react';
import './Nav.scss';
import '../index.scss';
import { Link } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';

export default function Nav() {
  const [navColor, setNavColor] = useState(false); // navbar color
  const [height, width] = useWindowSize(); // window size
 
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
            <div className="logo" >{width < 650 ? "GG" : "GreenGrocer" }</div>
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
