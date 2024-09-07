import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Photos from './components/Photos';
import Navbar from './components/Navbar';
import UploadForm from './components/UploadForm'; // Import UploadForm
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/upload" element={<UploadForm />} /> {/* Directly use UploadForm */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
