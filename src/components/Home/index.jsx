import React from 'react';
import { Link } from 'react-router-dom';
import './index-home.scss';
import SocialFeed from '../SocialFeed';

export default function Home() {
  return (
    <main className="home">
      <section className="welcome">
        <h1 className="slogan">
          Reduce your groceries&apos; carbon footprint.
        </h1>
        <div className="btn-wrapper">
          <form onSubmit={(e) => e.preventDefault()}>
            <Link to="/lists">
              <button type="button" className="home-btn">create new list</button>
            </Link>
          </form>
        </div>
        <div className="icon planet">
          <img src="images/planet-earth.png" alt="planet icon" />
        </div>
      </section>
      <SocialFeed />
    </main>
  );
}
