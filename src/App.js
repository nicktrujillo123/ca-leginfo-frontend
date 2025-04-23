// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query.length > 2) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query, page]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://ca-leginfo-api.vercel.app/search?q=${query}&page=${page}`
      );
      setResults(res.data.results);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-2xl">
        <h1 className="text-2xl font-bold mb-4">CA Legislative Smart Search</h1>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search bills, topics, authors..."
          className="w-full px-4 py-2 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {results.map((bill, idx) => (
              <li key={idx} className="border-b py-2">
                <p className="font-semibold">{bill.title}</p>
                <p className="text-sm text-gray-600">{bill.summary}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
