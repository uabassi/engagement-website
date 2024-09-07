import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <navbar>
      <ul className="left-nav">
        <li><Link to="/upload" className="button">Upload Photo</Link></li>
      </ul>
        <div className="center-nav">
          <Link to="/LandingPage">Malaika & Umayya</Link>
        </div>
      <ul className="right-nav">
        <li><Link to="/photos" className="button">Photos</Link></li>
      </ul>
    </navbar>
  );
};

export default Navbar;
