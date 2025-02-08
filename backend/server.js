const express = require('express');
const cors = require('cors');
require('dotenv').config();  // For loading environment variables (like the Gemini API key)
const lyricsRoutes = require('./routes/lyricsRoutes');  // Import the API routes

const app = express();
const port = process.env.PORT || 3000;  // Set the port to 3000 or whatever is specified in .env

app.use(cors());  // Enable cross-origin requests
app.use(express.json());  // Parse incoming JSON requests

// Test route to verify if the server is up
app.get('/test', (req, res) => {
  res.send('Server is running!');
});

// Use the lyrics routes for API requests starting with /api/lyrics
app.use('/api/lyrics', lyricsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
