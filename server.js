require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', authRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected successfully.');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });