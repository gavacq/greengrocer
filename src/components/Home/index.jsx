import React from 'react';
import './index-home.scss';

export default function Home() {
  return (
    <section className="home">
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
  );
}
