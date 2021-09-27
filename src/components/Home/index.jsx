import React from 'react';

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
        <button type="button" className="home-btn">create new list</button>
      </div>
    </section>
  );
}
