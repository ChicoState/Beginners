"use client";

import Link from "next/link";
import Image from "next/image";
import { defaultTopics } from "../constants/topics";

export default function TopicsGrid({ searchResults = [] }) {
  const topics = searchResults.length > 0 ? searchResults : defaultTopics;

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 pb-24">
      <h3 className="text-xl font-medium text-gray-400 mb-6 text-center">
        {searchResults.length > 0 ? "Search Results" : "Popular Topics"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link key={topic.id} href={topic.link}>
            <div className="group relative overflow-hidden rounded-xl h-64 hover-lift">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity z-10"></div>

              {/* Background Image */}
              <Image
                src={topic.image}
                alt={topic.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                priority={topic.id <= 3}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Click to learn
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
