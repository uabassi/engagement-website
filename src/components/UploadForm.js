import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css'; // Import the CSS file

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('Photoshoot');

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }
    formData.append('category', category);

    try {
      const response = await axios.post('http://localhost:5000/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading photos:', error);
    }
  };

  return (
    <div className="uploadFormContainer">
      <h2>Upload Photos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="photos">Photos:</label>
          <input type="file" id="photos" multiple onChange={handleFileChange} required />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={handleCategoryChange} required>
            <option value="Photoshoot">Photoshoot</option>
            <option value="Ring Ceremony">Ring Ceremony</option>
            <option value="Cake Cutting">Cake Cutting</option>
            <option value="Family">Family</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Upload Photos</button>
      </form>
    </div>
  );
};

export default UploadForm;
