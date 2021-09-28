import React from 'react';
import './index-home.scss';
import SocialFeed from '../SocialFeed';

export default function Home() {
  return (
    <main className="home">
      <section className="welcome">
        <h1>
          Welcome to GreenGrocer.
        </h1>
        <div className="icon planet">
          <img src="images/planet-earth.png" alt="planet icon" />
        </div>
        <div className="btn-wrapper">
          <form action="/lists">
            <button type="submit" className="home-btn">create new list</button>
          </form>
        </div>
      </section>
      <SocialFeed />
    </main>
  );
}
