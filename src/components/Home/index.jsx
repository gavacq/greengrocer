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
      <section className="green">
        <div className="wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill" />
          </svg>
        </div>
      </section>
      <SocialFeed />
    </main>
  );
}
