import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { fetchBarChartData } from "./config/apiService";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

const BarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef();

  useEffect(() => {
    setLoading(true);
    fetchBarChartData(selectedMonth)
      .then((response) => {
        console.log("Chart data:", response.data); // Log the response
        setChartData(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching bar chart data:", error);
        setError("Failed to fetch bar chart data");
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [selectedMonth]);

  // Prepare data for the chart
  const data = {
    labels: chartData.map((item) => item.range),
    datasets: [
      {
        label: "Number of Transactions",
        data: chartData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Show error or loading state before rendering chart
  if (loading) return <p>Loading chart data...</p>;
  if (error) return <p>{error}</p>;

  // Add a check to ensure chart data is not empty
  if (!chartData || chartData.length === 0) {
    return <p>No data available for the selected month</p>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto my-4">
      <Bar data={data} ref={chartRef} />
    </div>
  );
};

export default BarChart;
