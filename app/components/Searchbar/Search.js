"use client";

import { useState, useEffect } from "react";
import { defaultTopics } from "../../constants/topics";

// Helper function to properly capitalize words
const capitalizeWords = (str) => {
  // List of words that should not be capitalized (articles, conjunctions, prepositions)
  const lowercaseWords = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'in', 'of', 'with']);
  
  return str.split(' ').map((word, index) => {
    // Convert word to lowercase for checking
    const lowerWord = word.toLowerCase();
    
    // Always capitalize first and last word, proper nouns, or words not in our lowercase list
    if (index === 0 || !lowercaseWords.has(lowerWord) || /[A-Z]/.test(word[0])) {
      // Special handling for words with apostrophes or hyphens
      return word.split(/(['-])/).map((part, i) => {
        // If it's a separator (apostrophe/hyphen), keep it as is
        if (i % 2 === 1) return part;
        // Otherwise capitalize the first letter
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      }).join('');
    }
    
    return lowerWord;
  }).join(' ');
};

export default function Search({ onSearchResults }) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Cache configuration
  const CACHE_KEY = "learningStepsCache";
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const clearSearch = () => {
    setQuery("");
    onSearchResults({
      searchResults: [],
      learningSteps: null,
      isFromCache: false,
      formattedQuery: "",
      currentQuery: "",
      hasSearched: false
    });
  };

  // Expose clearSearch to window for global access
  useEffect(() => {
    window.clearSearch = clearSearch;
    return () => {
      delete window.clearSearch;
    };
  }, []);

  const getCachedSteps = (topic) => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      try {
        const cache = JSON.parse(cachedData);
        const now = new Date().getTime();
        const cachedResult = cache[topic.toLowerCase()];

        if (cachedResult && now - cachedResult.timestamp < CACHE_DURATION) {
          console.log("Using cached data for:", topic);
          return cachedResult.data;
        }
      } catch (error) {
        console.error("Error reading cache:", error);
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setIsLoading(true);

    try {
      // Format the query with proper capitalization
      const properlyFormattedQuery = capitalizeWords(trimmedQuery);

      // Filter topics
      const filteredTopics = defaultTopics.filter((topic) =>
        topic.title.toLowerCase().includes(trimmedQuery.toLowerCase())
      );

      // Check cache first
      const cachedSteps = getCachedSteps(trimmedQuery);
      let learningSteps;
      let isFromCache = false;

      if (cachedSteps) {
        // Short delay for cached results to show loading state
        await new Promise(resolve => setTimeout(resolve, 300));
        learningSteps = {
          ...cachedSteps,
          topic: properlyFormattedQuery
        };
        isFromCache = true;
      } else {
        // Get learning steps from API with more detailed request
        const response = await fetch("http://localhost:8000/api/learning-steps", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: trimmedQuery,
            format: "detailed",
            level: "comprehensive",
            style: "explanatory"
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch learning steps");
        }

        const data = await response.json();
        
        if (data.success) {
          // Cache the response
          try {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cache = cachedData ? JSON.parse(cachedData) : {};
            cache[trimmedQuery.toLowerCase()] = {
              data,
              timestamp: new Date().getTime(),
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
          } catch (error) {
            console.error("Error setting cache:", error);
          }

          learningSteps = {
            ...data,
            topic: properlyFormattedQuery
          };
        }
      }

      // Send results back to parent component
      onSearchResults({
        searchResults: filteredTopics,
        learningSteps,
        isFromCache,
        formattedQuery: properlyFormattedQuery,
        currentQuery: trimmedQuery,
        hasSearched: true
      });

    } catch (error) {
      console.error("Error in search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full flex justify-center mb-8">
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className={`flex items-center bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 border ${isLoading ? 'border-blue-400/50 shadow-blue-400/20' : 'border-blue-700/30'}`}>
          <input
            className="appearance-none bg-transparent w-full text-white py-3 px-4 leading-tight focus:outline-none transition duration-300 ease-in-out placeholder-blue-300/50 font-light"
            type="text"
            placeholder="Search a topic to learn..."
            aria-label="Search"
            value={query}
            onChange={handleChange}
            disabled={isLoading}
          />
          <button
            className={`flex items-center space-x-2 px-6 py-3 transition-all duration-300 ease-in-out font-medium
              ${isLoading 
                ? 'bg-blue-600/50 cursor-wait' 
                : 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 hover:from-blue-600 hover:via-blue-500 hover:to-blue-700'} 
              text-white rounded-lg`}
            type="submit"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Searching</span>
              </>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
