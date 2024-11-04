'use client';

import { useState } from 'react';
import SearchContainer from '../Searchbar/SearchContainer';
import FilterButton from '../Filter/FilterButton';

const SearchAndFilterContainer = () => {
  const [filters, setFilters] = useState({
    difficulty: 'all',
    sortBy: 'newest',
    category: 'all' 
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-end gap-4 items-start">
        <SearchContainer filters={filters} />
        <FilterButton onFilterChange={handleFilterChange} initialFilters={filters} />
      </div>
    </div>
  );
};

export default SearchAndFilterContainer;
