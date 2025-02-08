const axios = require('axios');
require('dotenv').config();

// Logic for generating lyrics
const generateLyrics = async (req, res) => {
  try {
    // Call Gemini API to generate content
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        // Define the content request body to the Gemini API
        contents: [{
          parts: [
            { text: "Generate lyrics for a rock and roll song about freedom" }
          ]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // If successful, send the generated response back
    const generatedLyrics = response.data;
    res.json({
      title: generatedLyrics.choices[0].text.split('\n')[0],  // Extract title from generated content
      content: generatedLyrics.choices[0].text              // Full content (lyrics)
    });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to generate lyrics' });
  }
};

module.exports = { generateLyrics };
