/* eslint-disable */

import React, { useState } from 'react';
import './Nav.scss';
import '../index.scss';
import { Link } from 'react-router-dom';
import { useAppContext } from '../lib/context';
import axios from 'axios';

export default function Nav() {
  const [navColor, setNavColor] = useState(false);
  const {user, setUser} = useAppContext();

  // change navbar color on scroll
  const changeNavColor = () => {
    if (window.scrollY >= 90) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };

  const loginButton = () => {
    return(
      <Link to="/login" className="desktop-menu-item">
          <li>Login</li>
      </Link>
    )
  }

  const handleLogout = () => {
    console.log('clicked');
    axios.post('/logout')
      .then((res) => {
        setUser((prev) => {
          return {
            ...prev,
            auth: res.data.auth
          }
        })
      })
  }

  const logoutButton = () => {
    const logoutStyle = {
      cursor: "pointer"
    }
  
    return(
      <li className="desktop-menu-item" style={logoutStyle} onClick={handleLogout}>Logout</li>
    )
  }

  window.addEventListener('scroll', changeNavColor);

  return (
    <div className={navColor ? 'nav-container sticky active' : 'nav-container sticky'}>
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
            {user.auth ? logoutButton() : loginButton()}
          </ul>
        </nav>
      </div>
    </div>
  );
}
