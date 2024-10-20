import React, { useState } from "react";
import TransactionTable from "./components/TransactionTable";
import BarChart from "./components/BarChart";
import ErrorBoundary from "./components/ErrorBoundary";
import Statistics from "./components/Statistics";

function App() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  return (
    <div className="App">
      <h1 className="text-center  text-3xl font-bold mt-8">
        Transaction Dashboard
      </h1>

      {/* Transaction Table */}
      <TransactionTable
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      {/* Statistics */}
      {/* <Statistics selectedMonth={selectedMonth} /> */}

      {/* Bar Chart */}
      <ErrorBoundary>
        <BarChart selectedMonth={selectedMonth} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
