// api.js

import axios from "axios";

const BASE_URL = "http://localhost:3000/api/user"; // Replace with your actual API base URL

export const saveProject = async (token, userId, projectName) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/projects`, // Replace with your actual API endpoint for saving projects
      {
        userId,
        projectName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Assuming the response contains the saved project details
  } catch (error) {
    throw error;
  }
};
