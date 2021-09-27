import React from 'react';
import './index-home.scss';

export default function Home() {
  return (
    <section className="home">
      <h1>
        Welcome to GreenGrocer.
      </h1>
      <div className="icon strawberry">
        <img src="images/strawberry.png" alt="strawberry icon" />
      </div>
      <div className="btn-wrapper">
        <form action="/lists">
          <button type="submit" className="home-btn">create new list</button>
        </form>
      </div>
    </section>
  );
}
