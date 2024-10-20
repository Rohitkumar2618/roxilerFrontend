// !!!!!!!!!!!!!!!!

import axios from "axios";

const API_URL = "http://localhost:4000/api"; // Backend server URL

// Fetch transactions
export const fetchTransactions = (month, search = "") => {
  return axios.get(`${API_URL}/transactions`, {
    params: { month, search },
  });
};

// Fetch statistics
export const fetchStatistics = (month) => {
  return axios.get(`${API_URL}/statistics`, {
    params: { month },
  });
};

// Fetch bar chart data
export const fetchBarChartData = async (selectedMonth) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/bar-chart?month=${selectedMonth}`
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch bar chart data: " + error.message);
  }
};
