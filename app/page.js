'use client';

import { useEffect, useState } from 'react';
import Search from './components/Searchbar/Search';
import Link from 'next/link';

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    // Fetch posts when the page is loaded or when localStorage has data
    useEffect(() => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        } else {
            const fetchPosts = async () => {
                const response = await fetch('http://127.0.0.1:8000/api/posts/');
                const data = await response.json();
                setPosts(data);
                localStorage.setItem('posts', JSON.stringify(data));
            };
            fetchPosts();
        }
    }, []);

    // Handle new post submission and update the posts list
    const handlePostCreated = async (newPost) => {
        const response = await fetch('http://127.0.0.1:8000/api/posts/');
        const updatedPosts = await response.json();
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    // Handle post deletion
    const handleDeletePost = async (postId) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/posts/${postId}/`, {
            method: 'DELETE', // DELETE request to remove the post
        });

        if (response.ok) {
            setPosts((prevPosts) => {
                const updatedPosts = prevPosts.filter((post) => post.id !== postId);
                localStorage.setItem('posts', JSON.stringify(updatedPosts));
                return updatedPosts;
            });
            setMessage('Post deleted successfully!');
            setMessageType('success');
        } else {
            const data = await response.json();
            setMessage(`Failed to delete post. ${data.message || 'Server responded with an error.'}`);
            setMessageType('error');
        }
    } catch (error) {
        console.error('Network or server error while deleting post:', error);
        setMessage('Failed to delete post due to a network or server error.');
        setMessageType('error');
    }
};


    // Handle form submission for creating a new post
    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title: title,
            content: text,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure the correct header
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error(`Failed to create post. Status: ${response.status}`);
            }

            const newPost = await response.json();

            // After the post is created, update the posts list
            setPosts((prevPosts) => [newPost, ...prevPosts]);  // Prepend the new post

            // Reset form fields
            setTitle('');
            setText('');

            setMessage('Post created successfully!');
            setMessageType('success');
        } catch (error) {
            console.error('Error creating post:', error);
            setMessage('Failed to create post.');
            setMessageType('error');
        }
    };
    return (
        <div className="min-h-screen flex flex-col bg-tan justify-center items-center">
            {/* Error Message Display */}
            {message && (
                <div className={`bg-${messageType === 'success' ? 'green' : 'red'}-500 text-white p-4 mb-4 text-center`}>
                    {message}
                </div>
            )}

            {/* Top Section */}
            <header className="bg-blue-600 text-white p-4 w-full flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold mb-4 text-brown glow cursive-font">
                    BEGINNERS
                </h1>

                {/* Buttons Section */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <Link
                        href="/login"
                        className="border border-brown text-white hover:bg-brown hover:text-white text-lg font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/signup"
                        className="border border-brown text-white hover:bg-brown hover:text-white text-lg font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
                    >
                        Sign Up
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-4 w-full max-w-4xl flex flex-col items-center justify-center">
                <p className="mb-4 text-blue text-center animate-fadeIn text-3xl">
                    Welcome!
                </p>

                {/* Search Bar */}
                <div className="w-full max-w-xl mb-8">
                    <Search />
                </div>

                {/* List of Posts */}
                <div className="w-full max-w-xl mb-8">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="mb-4 p-4 bg-gray-100 rounded shadow-sm">
                                <h3 className="text-xl font-semibold">{post.title}</h3>
                                <p className="text-black-700">{post.content}</p>
                                <button
                                    onClick={() => handleDeletePost(post.id)}
                                    className="mt-2 py-1 px-4 bg-red-500 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No posts available</p>
                    )}
                </div>

                {/* Floating Button for Modal */}
                <button
                    className="fixed bottom-4 right-4 flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-white text-2xl py-2 px-3 rounded-full"
                    onClick={() => setIsFormOpen(true)}
                >
                    +
                </button>

                {/* Modal for Creating Post */}
                {isFormOpen && (
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded w-1/2">
                            <h1 className="text-2xl text-gray-700 font-bold mb-2">Create a New Post</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full p-4 border border-gray-400 rounded bg-gray-800 text-gray-200"
                                        placeholder="Enter title here..."
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Text Entry</label>
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="w-full p-4 border border-gray-400 rounded bg-gray-800 text-gray-200"
                                        placeholder="Enter text here..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                                    onClick={() => setIsFormOpen(false)}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
