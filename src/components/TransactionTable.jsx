import React, { useState, useEffect } from "react";
import { fetchTransactions } from "./config/apiService";

const TransactionTable = ({ selectedMonth, setSelectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Fetch transactions when selectedMonth changes
  useEffect(() => {
    fetchTransactions(selectedMonth)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTransactions(response.data);
          setFilteredTransactions(response.data);
        } else {
          setTransactions([]);
          setFilteredTransactions([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
        setFilteredTransactions([]);
      });
  }, [selectedMonth]);

  // Filter transactions based on search input
  useEffect(() => {
    const filtered = transactions.filter((transaction) =>
      Object.values(transaction).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredTransactions(filtered);
  }, [search, transactions]);

  return (
    <div className="w-full max-w-5xl mx-auto my-4">
      <div className="flex justify-between mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search transaction"
          className="border p-2 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Month Selector */}
        <select
          className="border p-2 rounded-md"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions Table */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Sold</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="border px-4 py-2">{transaction.id}</td>
                <td className="border px-4 py-2">{transaction.title}</td>
                <td className="border px-4 py-2">{transaction.description}</td>
                <td className="border px-4 py-2">${transaction.price}</td>
                <td className="border px-4 py-2">{transaction.category}</td>
                <td className="border px-4 py-2">
                  {transaction.sold ? "Yes" : "No"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
