// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <html>
      <head>
        <meta name='viewport' content="width=device-width, initial-scale:1.0"></meta>
      </head>
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/tasks">Tasks</NavLink></li>
        <li><NavLink to="/Notes">Notes</NavLink></li>
      </ul>
    </nav>
    </html>
  );
};

export default Navbar;
