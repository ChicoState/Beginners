'use client';
import { useState } from 'react';

const FilterButton = ({ onFilterChange, initialFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters || {
    category: 'all',
    difficulty: 'all',
    sortBy: 'newest'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
      >
        Filter
      </button>

      {isOpen && (
        <div className="absolute -0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg p-4 z-50">
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-white mb-2">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-md p-2"
              >
                <option value="all">All Categories</option>
                <option value="iphone">iPhone Guides</option>
                <option value="cooking">Cooking Guides</option>
                <option value="music">Guitar Guides</option>
                <option value="gaming">Gaming Guides</option>
                <option value="education"> Math Guides</option>
                
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-white mb-2">Difficulty</label>
              <select
                name="difficulty"
                value={filters.difficulty}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-md p-2"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-white mb-2">Sort By</label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-md p-2"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
