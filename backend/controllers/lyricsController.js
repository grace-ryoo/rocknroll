const axios = require('axios');
require('dotenv').config();  // Ensure you're using the .env for the API key

// Function to generate lyrics
exports.generateLyrics = async (req, res) => {
  try {
    const { theme, emotion } = req.body;  // Accept theme and emotion from user input

    // Log the incoming request body for debugging
    console.log("Request body:", req.body);

    // Create a prompt for the Gemini API based on the theme and emotion
    const prompt = `Write a song about ${theme} in rock and roll with emotion of ${emotion}.`;

    // Define Gemini API endpoint and parameters
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    const apiKey = process.env.GEMINI_API_KEY;
    
    // Send the request to Gemini API
    const response = await axios.post(`${url}?key=${apiKey}`, {
      contents: [{
        parts: [{ text: prompt }]
      }]
    });

    // Log the response from Gemini API for debugging
    console.log("Gemini API Response:", response.data);

    // Extract the content
    const content = response.data.candidates[0].content;
    
    // Now let's check if content is there and extract the first verse
    if (content && content.parts && content.parts.length > 0) {
      // Extract lyrics
      let verseText = content.parts[0].text;

      // Filter out text that contains sound directions or non-lyrical elements (like "(Guitar solo)")
      const cleanedVerse = verseText.split("\n")
        .filter(line => !line.toLowerCase().includes("(guitar") && 
                        !line.toLowerCase().includes("(heavy") && 
                        !line.toLowerCase().includes("(chorus"))
        .join("\n");

      // Extract only the first verse by splitting on the word "Verse" and selecting the first part
      const firstVerse = cleanedVerse.split("(Verse 1)").slice(1).join("(Verse 1)").split("\n").slice(0, 10).join("\n"); // Adjust number for verse length
      
      // Log cleaned first verse
      console.log("First Verse:", firstVerse);

      res.json({ verse: firstVerse });
    } else {
      console.log("No content found in the response:", content);
      res.json({ verse: "No content generated" });
    }

  } catch (error) {
    // Log the error details
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Failed to generate lyrics" });
  }
};
