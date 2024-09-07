import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="top-bar">
        <h1>Malaika & Umayya</h1>
      </div>
      <div className="image-grid">
        <img className="left-img" src="images/photo3.jpg" alt="Photo 1" />
        <div className="center-img-wrapper">
          <img className="center-img" src="images/photo1.jpg" alt="Photo 2" />
          <div className="date">
            <h2>6 • 01 • 2024</h2>
          </div>
        </div>
        <img className="right-img" src="images/photo4.jpg" alt="Photo 3" />
      </div>
    </div>
  );
};

export default LandingPage;
