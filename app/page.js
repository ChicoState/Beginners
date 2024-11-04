'use client';

import { useEffect, useState } from 'react';
import SearchAndFilterContainer from './components/SearchAndFilter/SearchAndFilerContainer';
import Link from 'next/link';
import EntryButton from './components/UserEntries/EntryButton';


export default function HomePage() {
    const [boxesVisible, setBoxesVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setBoxesVisible(true);
        }, 100);
         return () => clearTimeout(timer);
    }, []);


    return (
        <div className="p-4 bg-black min-h-screen flex flex-col items-center relative">
            <h1 className="text-5xl font-bold mb-4 text-white glow cursive-font">Beginners</h1>
            <p className="mb-4 text-white text-center animate-fadeIn text-3xl">
                Welcome!
            </p>


            {/* Login Button */}
            <Link href="/login" className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
            </Link>
            {/* Sign Up Button */}
            <Link href="/signup" className="absolute top-4 left-24 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
            </Link>
            <div className="w-full max-w-xl mb-8">
               <SearchAndFilterContainer /> {/* This renders both search and filter */}
            </div>
            <EntryButton />
        </div>
    );
}
