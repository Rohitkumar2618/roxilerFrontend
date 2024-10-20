import React from "react";

const Dropdown = ({ selectedMonth, onMonthChange }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <select
      value={selectedMonth}
      onChange={(e) => onMonthChange(e.target.value)}
      className="block w-1/3 p-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
