const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Simple route to check if server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Route to handle generating lyrics
app.post('/api/lyrics/generate', require('./controllers/lyricsController').generateLyrics);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
