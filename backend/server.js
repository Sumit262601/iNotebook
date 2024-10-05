// Import dependencies
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./DB/db'); // MongoDB connection
require('dotenv').config();

// Initialize the app and set the port
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongo().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// API routes
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/notes/', require('./routes/notes'));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
