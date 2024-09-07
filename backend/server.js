require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection string
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/EngagementSite';


// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Photo schema
const photoSchema = new mongoose.Schema({
  src: String,
  alt: String,
  category: String,
  hash: String
});

const Photo = mongoose.model('Photo', photoSchema);

// Multer setup for file uploads
const storage = multer.memoryStorage(); // Use memory storage

const upload = multer({ storage });

// Route to handle photo uploads
app.post('/photos', upload.array('photos', 10), async (req, res) => {
  const { category } = req.body;

  console.log('Received category:', category);
  console.log('Received files:', req.files);

  try {
    const photos = req.files.map((file) => {
      const filePath = `uploads/${file.originalname}`;
      fs.writeFileSync(filePath, file.buffer); // Save file to disk
      return {
        src: `/${filePath}`,
        alt: file.originalname,
        category,
        hash: crypto.createHash('md5').update(file.buffer).digest('hex')
      };
    });

    console.log('Saving photos:', photos);

    const newPhotos = await Photo.insertMany(photos);
    res.status(201).json(newPhotos);
  } catch (err) {
    console.error('Error saving photos:', err);
    res.status(400).json({ message: err.message });
  }
});

// Route to list photos by category with pagination
app.get('/photos/:category', async (req, res) => {
  const { category } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const photos = await Photo.find({ category }).skip(skip).limit(limit);
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
