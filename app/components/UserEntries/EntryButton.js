import { useState, useRef } from 'react';

const DIFFICULTY_LEVELS = [
    { id: 'easy', label: 'Easy', color: 'bg-green-500' },
    { id: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { id: 'hard', label: 'Hard', color: 'bg-orange-500' },
    { id: 'advanced', label: 'Advanced', color: 'bg-red-500' }
];

export default function EntryButton() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [video, setVideo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState(DIFFICULTY_LEVELS[0]);
    const tabsRef = useRef(null);

    const scroll = (direction) => {
        if (tabsRef.current) {
            const scrollAmount = 200;
            tabsRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Title:', title);
        console.log('Text:', text);
        console.log('Difficulty:', selectedDifficulty.label);
        if (video) {
            console.log('Video:', video.name);
        }
        setIsOpen(false);
    };

    return (
        <div>
            <button
                className="fixed bottom-4 right-4 flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-white text-2xl py-2 px-3 rounded-full shadow-lg transition-colors duration-200"
                onClick={() => setIsOpen(true)}
            >
                +
            </button>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl">
                        <h1 className="text-2xl text-gray-700 font-bold mb-4">New Entry</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 border border-gray-400 rounded bg-gray-800 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter title here..."
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-gray-700 font-bold mb-2">Difficulty Level</label>
                                <div className="relative flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => scroll('left')}
                                        className="absolute left-0 z-10 bg-gradient-to-r from-white via-white to-transparent px-2 h-full"
                                    >
                                        ◀
                                    </button>
                                    <div 
                                        ref={tabsRef}
                                        className="flex overflow-x-auto scrollbar-hide space-x-2 px-8 py-2 scroll-smooth"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {DIFFICULTY_LEVELS.map((difficulty) => (
                                            <button
                                                key={difficulty.id}
                                                type="button"
                                                onClick={() => setSelectedDifficulty(difficulty)}
                                                className={`flex-shrink-0 px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                                                    selectedDifficulty.id === difficulty.id
                                                        ? `${difficulty.color} text-white scale-105`
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            >
                                                {difficulty.label}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => scroll('right')}
                                        className="absolute right-0 z-10 bg-gradient-to-l from-white via-white to-transparent px-2 h-full"
                                    >
                                        ▶
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Text Entry</label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="w-full p-3 border border-gray-400 rounded bg-gray-800 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px]"
                                    placeholder="Enter text here..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Upload Video</label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setVideo(e.target.files[0])}
                                    className="w-full p-2 border border-gray-400 rounded bg-gray-800 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
