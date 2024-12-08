"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Searchbar/Search";
import TopicsGrid from "./components/TopicsGrid";
import ExpertCard from "./components/ExpertCard";
import LearningSteps from "./components/LearningSteps";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const [learningSteps, setLearningSteps] = useState(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [formattedQuery, setFormattedQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchResults = (results) => {
    setSearchResults(results.searchResults);
    setLearningSteps(results.learningSteps);
    setIsFromCache(results.isFromCache);
    setFormattedQuery(results.formattedQuery);
    setCurrentQuery(results.currentQuery);
    setHasSearched(results.hasSearched);
  };

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-4xl font-bold mb-4 title-gradient">
            Learn Anything
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your personal AI-powered learning companion. Search any topic to get
            started.
          </p>
        </div>

        <Search onSearchResults={handleSearchResults} />

        {/* Learning Steps and Expert Section */}
        <div
          className="w-full max-w-4xl mx-auto space-y-8 mb-12 transition-opacity duration-300 ease-in-out"
          style={{ opacity: hasSearched ? 1 : 0 }}
        >
          {hasSearched && (
            <>
              <LearningSteps
                learningSteps={learningSteps}
                isFromCache={isFromCache}
                searchQuery={formattedQuery}
                isLoading={isLoading}
              />
              <ExpertCard topic={currentQuery} />
            </>
          )}
        </div>

        {/* Topics Grid */}
        <TopicsGrid searchResults={searchResults} />
      </div>
    </main>
  );
}
