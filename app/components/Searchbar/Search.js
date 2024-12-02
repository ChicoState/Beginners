'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Searchbar() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const boxes = [
        { id: 1, title: 'iPhone', image: '/pictures/iphone.jpg', link: '/iphone' },
        { id: 2, title: 'Cooking', image: '/pictures/cooking.jpg', link: '/cooking' },
        { id: 3, title: 'Guitar', image: '/pictures/guitar.jpg', link: '/guitar' },
        { id: 4, title: 'Grilling', image: '/pictures/grilling.jpg', link: '/grilling' },
        { id: 5, title: 'Math', image: '/pictures/math.jpg', link: '/math' },
        { id: 6, title: 'Game Develop', image: '/pictures/gamedevelop.jpg', link: '/gamedevelop' }
    ];

    const handleSearch = (query) => {
        setQuery(query);
        const filteredBoxes = boxes.filter(box =>
            box.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredBoxes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            handleSearch(query);
            setQuery(''); // Clear the search bar after submission
        }
    };

    return (
        <div>
            {/* Search Bar Form */}
            <div className="w-full flex justify-center mb-4">
                <form onSubmit={handleSubmit} className="w-full max-w-xl">
                    <div className="flex items-center border border-yellow-500 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                        <input
                            className="appearance-none bg-gray-800 border-none w-full text-white py-2 px-4 leading-tight focus:outline-none transition duration-300 ease-in-out placeholder-gray-400"
                            type="text"
                            placeholder="Search..."
                            aria-label="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-sm text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                            type="submit"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {/* Search Results or Default Display */}
            <div className="mt-4 w-full max-w-4xl">
                {query && searchResults.length === 0 ? (
                    <p className="text-center text-white mb-4 font-bold text-3xl">
                        No results found. Here are some recommendations:
                    </p>
                ) : null}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {searchResults.length > 0 ? (
                        searchResults.map(box => (
                            <Link
                                href={box.link}
                                key={box.id}
                                className="flex flex-col items-center bg-gray-800 p-4 rounded-lg border border-brown-500 hover:bg-blue-500 transition duration-200 transform hover:scale-105"
                            >
                                <img src={box.image} alt={box.title} className="w-full h-32 object-cover mb-2 rounded-md" />
                                <h2 className="text-lg font-semibold text-center text-white hover:text-black">{box.title}</h2>
                            </Link>
                        ))
                    ) : (
                        boxes.map(box => (
                            <Link
                                href={box.link}
                                key={box.id}
                                className="flex flex-col items-center bg-blue-800 p-4 rounded-lg border border-gray-500 hover:bg-blue-500 transition duration-200 transform hover:scale-105"
                            >
                                <img src={box.image} alt={box.title} className="w-full h-32 object-cover mb-2 rounded-md" />
                                <h2 className="text-lg font-semibold text-center text-white hover:text-black">{box.title}</h2>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
