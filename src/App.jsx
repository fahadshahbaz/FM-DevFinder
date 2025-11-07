import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import UserDisplay from "./components/UserDisplay";

function App() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGithubUser = async (username) => {
    setLoading(true); // Start loading indicator
    setError(null);   // Clear any previous errors

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const userData = await response.json();
      console.log(userData);
      
      setResults(userData);
      setError(null);
    } catch (err) {
      setError("User not found");
      setResults(null);
    } finally {
      setLoading(false); // Stop loading whether successful or not
    }
  };

  useEffect(() => {
    fetchGithubUser("octocat");
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F8FF] dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center">
      <Navbar />
      <SearchBar fetchGithubUser={fetchGithubUser} />

      {/* Add Loading Spinner */}
      {loading && (
        <div className="mt-8">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 mt-8">{error}</p>}

      {/* User Display */}
      {!loading && !error && results && <UserDisplay results={results} />}
    </div>
  );
}

export default App;
