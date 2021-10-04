/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import './Nav.scss';
import '../index.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useWindowSize from '../hooks/useWindowSize';
import { useAppContext } from '../lib/context';

export default function Nav() {
  const [navColor, setNavColor] = useState(false); // navbar color
  const [height, width] = useWindowSize(); // eslint-disable-line
  const { userContext } = useAppContext();
  const [user, setUser] = userContext;
  const [hamburger, setHamburger] = useState(false);

  // change navbar color on scroll
  const changeNavColor = () => {
    if (window.scrollY >= 90) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };

  window.addEventListener('scroll', changeNavColor);

  // responsively change logo: change source attribute (file)
  const changeNavLogo = () => {
    if (width > 720 && window.scrollY <= 90) {
      return './images/GG_large_logo_green.png';
    }
    if (width > 720 && window.scrollY > 90) {
      return './images/GG_large_logo_white.png';
    }
    if (width < 720 && window.scrollY <= 90) {
      return './images/GG_small_logo_green.png';
    }
    return './images/GG_small_logo_white.png';
  };

  // logo: style logo: add class
  const changeLogoClass = () => {
    if (width >= 720) {
      return 'GG-logo-large';
    }
    return 'GG-logo-small';
  };

  const loginButton = () => (
    <Link to="/login" className="desktop-menu-item">
      <li>Login</li>
    </Link>
  );

  const handleLogout = () => {
    axios.post('/logout')
      .then((res) => {
        setUser((prev) => ({
          ...prev,
          auth: res.data.auth,
        }));
      });
  };

  const logoutButton = () => {
    const logoutStyle = {
      cursor: 'pointer',
    };

    return (
      <>
        <li className="desktop-menu-item">{user.username}</li>
        <li className="desktop-menu-item" style={logoutStyle} onClick={handleLogout}>Logout</li>
      </>
    );
  };

  window.addEventListener('scroll', changeNavColor);

  const hamburgerHelper = () => {
    if (hamburger) {
      setHamburger(false);
    } else {
      setHamburger(true);
    }
  };

  useEffect(() => {
    axios.get('/login')
      .then((res) => {
        setUser((prev) => ({
          ...prev,
          auth: res.data.auth,
          username: res.data.username,
        }));
      });
  }, []);

  useEffect(() => {
    if (width > 720) {
      setHamburger(false);
    } else {
      setHamburger(true);
    }
  }, [width]);

  return (
    <div className={navColor ? 'nav-container sticky active' : 'nav-container sticky'}>
      <div className="wrapper">
        <nav>
          <Link to="/" className="logo-link">
            <div className="logo">
              <img className={changeLogoClass()} src={changeNavLogo()} alt="logo" />
            </div>
          </Link>

          <div className="nav-content-right">
            <div className="hamburger-container" role="button" tabIndex={0} onClick={hamburgerHelper}>
              <div className={hamburger ? 'hamburger-brick' : 'hamburger-brick hamburger-on-1'} />
              <div className={hamburger ? 'hamburger-brick' : 'hamburger-brick hamburger-on-2'} />
              <div className={hamburger ? 'hamburger-brick' : 'hamburger-brick hamburger-on-3'} />
            </div>

            <ul className="desktop-menu" style={hamburger ? { display: 'none' } : { display: 'flex' }}>
              {user.auth ? logoutButton() : loginButton()}
              <Link to="/lists" className="desktop-menu-item">
                <li>Lists</li>
              </Link>
              <Link to="/stats" className="desktop-menu-item">
                <li>Stats</li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
