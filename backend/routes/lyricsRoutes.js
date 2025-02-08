const express = require('express');
const router = express.Router();

// Import the controller for generating lyrics
const { generateLyrics } = require('../controllers/lyricsController');

// POST route for generating lyrics
router.post('/generate', generateLyrics);

module.exports = router;
