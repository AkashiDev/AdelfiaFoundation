// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Adelfia</h1>
      <nav>
        <ul>
          <li><Link to="/missions">Our Missions</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/donate">Donate Us</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
