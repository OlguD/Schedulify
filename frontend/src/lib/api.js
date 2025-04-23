import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

/**
* Generic API request function
* @param {string} method - HTTP method (get, post, put, delete, etc.)
* @param {string} endpoint - API endpoint
* @param {Object} [data] - Request body daya
* @param {Object} [config] - Additional axios config

* @returns {Promise} - API response
*/

export default async function api(method, endpoint, data = null, config = {}) {
  try {
    response = await axios({
      method: method.toLowerCase(),
      url: `${BASE_URL}${endpoint}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    });

    if (!response.data) {
      throw new Error("No data recieved from the server");
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
        endpoint: endpoint,
      });
      throw new Error(error.response.data.message || "Server error occured");
    } else if (error.request) {
      console.error("Network Error:", error.request);
      throw new Error("Network error - no response recieved");
    } else {
      console.error("Request Error:", error.message);
      throw new Error("Error setting up the request");
    }
  }
}
