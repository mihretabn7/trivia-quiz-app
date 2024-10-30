// src/utils/questionGenerator.js
import axios from 'axios';

const generateQuestions = async (theme) => {
  try {
    const response = await axios.post('YOUR_GEMINI_API_ENDPOINT', {
      theme: theme,
    });
    return response.data.questions; // Adjust based on the API response structure
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
};

export default generateQuestions;
