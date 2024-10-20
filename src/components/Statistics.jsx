import React, { useState, useEffect } from "react";
import { fetchStatistics } from "./config/apiService";

const Statistics = ({ selectedMonth }) => {
  const [stats, setStats] = useState({
    totalSale: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    fetchStatistics(selectedMonth).then((response) => {
      setStats(response.data);
    });
  }, [selectedMonth]);

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Statistics for{" "}
        {new Date(0, selectedMonth - 1).toLocaleString("en", { month: "long" })}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Sale */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Sale</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">
            ${stats.totalSale}
          </p>
        </div>

        {/* Total Sold Items */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Sold Items</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.totalSoldItems}
          </p>
        </div>

        {/* Total Not Sold Items */}
        <div className="bg-red-50 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Not Sold Items
          </h3>
          <p className="text-3xl font-bold text-red-500 mt-2">
            {stats.totalNotSoldItems}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
