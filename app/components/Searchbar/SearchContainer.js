'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Searchbar from './Searchbar';


export default function SearchContainer({ filters }) {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState(""); // State for the search query

    const boxes = [
        { id: 1, title: 'iPhone', image: '/pictures/iphone.jpg', link: '/iphone', category: 'iphone' },
        { id: 2, title: 'Cooking', image: '/pictures/cooking.jpg', link: '/cooking', category: 'cooking' },
        { id: 3, title: 'Guitar', image: '/pictures/guitar.jpg', link: '/guitar', category: 'music' },
        { id: 4, title: 'Grilling', image: '/pictures/grilling.jpg', link: '/grilling', category: 'cooking' },
        { id: 5, title: 'Math', image: '/pictures/math.jpg', link: '/math', category: 'education' },
        { id: 6, title: 'Game Develop', image: '/pictures/gamedevelop.jpg', link: '/gamedevelop', category: 'gaming' }
    ];

    const handleSearch = (query) => {
        setQuery(query); // Update the query state
    };

    useEffect(() => {
        const filteredBoxes = boxes.filter(box => {
             const matchesQuery = box.title.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = filters.category ? filters.category === 'all' || box.category === filters.category : true;
            return matchesQuery && matchesCategory;
        });
        setSearchResults(filteredBoxes);
    }, [query, filters]); // Update results when query or filters change

    return (
        <div>
            <Searchbar onSearch={handleSearch} />
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
                                className="flex flex-col items-center bg-gray-800 p-4 rounded-lg hover:bg-blue-500 transition duration-200 transform hover:scale-105"
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
                                className="flex flex-col items-center bg-gray-800 p-4 rounded-lg hover:bg-blue-500 transition duration-200 transform hover:scale-105"
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
