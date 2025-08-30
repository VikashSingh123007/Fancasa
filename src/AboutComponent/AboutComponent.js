// src/AboutComponent/AboutComponent.js
import React from "react";
import "./AboutComponent.css";

const AboutComponent = () => {
  return (
    <section className="about">
      <div className="about-container">
        <h1>About Fancasa</h1>
        <p>
          Welcome to <strong>Fancasa</strong> – your home for the latest sports
          news, match updates, and fan-driven entertainment.  
          We bring you real-time updates, match highlights, breaking news, and
          engaging fan experiences, all in one place.
        </p>

        <p>
          Our mission is to create a vibrant hub where sports enthusiasts can
          stay informed, connect with like-minded fans, and enjoy curated
          content that celebrates the spirit of sports and entertainment.
        </p>

        <p>
          From match-day coverage to exclusive insights, we aim to make every
          fan’s journey exciting, interactive, and unforgettable.
        </p>
      </div>
    </section>
  );
};

export default AboutComponent;
