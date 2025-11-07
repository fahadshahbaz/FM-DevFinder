import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import UserDisplay from "./components/UserDisplay";

export interface GitHubUser {
  avatar_url: string;
  login: string;
  name: string | null;
  created_at: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string;
  twitter_username: string | null;
  company: string | null;
}

function App() {
  const [results, setResults] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGithubUser = async (username: string): Promise<void> => {
    setLoading(true); // Start loading indicator
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const userData: GitHubUser = await response.json();

      setResults(userData);
      setError(null);
    } catch {
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
