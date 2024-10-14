import axios from "axios";

/**
 * Fetch data from the insights API...
 *
 * @param {string} query - query.
 * @param {number} startYear - start year
 * @param {number} endYear - end year
 * @returns {Promise<Object>} - insight, chart and summary
 */
export const fetchData = async (query, startYear, endYear) => {
  try {
    const apiUrl = process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PRODUCTION_API_URL
      : process.env.REACT_APP_API_URL;

    const response = await axios.get(`${apiUrl}/search`, {
      params: {
        query: query.trim().toLowerCase(),
        startYear,
        endYear,
      },
    });

    return {
      insights: response.data.insights,
      chartData: response.data.chartData,
      summary: response.data.summary,
    };
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw new Error("Failed to fetch data from the server.");
  }
};
