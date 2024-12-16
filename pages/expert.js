import { useEffect, useState } from 'react';

export default function ExpertPage() {
    const [expert, setExpert] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchExpertAndPosts() {
            try {
                const response = await fetch('/api/expert');
                if (!response.ok) {
                    throw new Error('Failed to fetch expert data');
                }
                const data = await response.json();
                setExpert(data.expert);
                setPosts(data.posts || []); // Ensure posts is an array
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchExpertAndPosts();
    }, []);

    if (loading) return <p>Loading expert data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Expert Information</h1>

            {expert ? (
                <div className="bg-white p-4 rounded shadow-md w-full max-w-lg">
                    <p className="mb-2">
                        <strong>Name:</strong> {expert.name}
                    </p>
                    <p className="mb-2">
                        <strong>Email:</strong> {expert.email}
                    </p>
                    <p className="mb-2">
                        <strong>Phone:</strong> {expert.phone}
                    </p>
                    <p className="mb-2">
                        <strong>Bio:</strong> {expert.bio}
                    </p>
                    <p className="mb-2">
                        <strong>Expertise:</strong> {expert.expertise}
                    </p>
                </div>
            ) : (
                <p className="text-red-500">No expert data available.</p>
            )}

            <h2 className="text-2xl font-semibold mt-6 mb-4">Posts</h2>
            {Array.isArray(posts) && posts.length > 0 ? (
                <ul className="w-full max-w-lg space-y-2">
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            className="bg-gray-200 p-3 rounded shadow-md"
                        >
                            <h3 className="font-bold">{post.title}</h3>
                            <p>{post.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No posts available.</p>
            )}

            {/* Login and Logout Buttons */}
            <div className="mt-8 flex space-x-4">
                <button
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition"
                >
                    Login
                </button>
                <button
                    className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-400 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
