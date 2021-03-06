import React from 'react';
import './App.scss';

export default function Footer() {
  return (
    <footer>
      <div className="contact-us">
        <h4>Contact us</h4>
        <div className="linkedin">
          <div className="contact-item"><a href="https://www.linkedin.com/in/lliam-mcbean/">Lliam McBean</a></div>
          <div className="contact-item"><a href="https://www.linkedin.com/in/solene-delumeau/">Solene Delumeau</a></div>
          <div className="contact-item"><a href="https://www.linkedin.com/in/gacquroff/">Gavin Acquroff</a></div>
        </div>
        <div className="credits">
          {/* eslint-disable-next-line */}
          Icons by <a href="https://www.freepik.com" title="Freepik">Freepik </a>
          {/* eslint-disable-next-line */}
          from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com </a> 
          {/* eslint-disable-next-line */}
          & Logo by <a href="https://www.instagram.com/hima_wari.arts">@hima_wari.arts</a>
        </div>
      </div>
      <div className="social-icons">
        <i className="fab fa-instagram" />
        <i className="fab fa-twitter" />
        <i className="fab fa-facebook" />
      </div>
    </footer>
  );
}
