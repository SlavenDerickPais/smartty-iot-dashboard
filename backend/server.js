const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (the uploaded device images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use device routes
app.use('/api/devices', deviceRoutes);

app.listen(PORT, () => console.log(`Smartty backend running on port ${PORT}`));