'use client';

export default function ExpertProfilePage() {
    const expert = {
        name: "Luis Martinez",
        email: "lemartinez5@example.com",
        phone: "(123) 456-7890",
        bio: "Computer Science student",
        expertise: ["Artificial Intelligence", "Machine Learning", "Computer Science"],
        socialLinks: {
            linkedin: "https://linkedin.com/in/johndoe",
            X: "https://X.com/johndoe",
            github: "https://github.com/johndoe",
        },
    };

    const posts = [
        { id: 1, title: "AI Basics", date: "2024-12-01" },
        { id: 2, title: "Machine Learning for Beginners", date: "2024-12-05" },
    ];

    return (
        <main className="flex flex-col items-center p-12 bg-gray-900 min-h-screen">
            {/* Expert Info Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 text-yellow-400">Expert Profile</h1>
                <p className="text-white text-2xl font-semibold">{expert.name}</p>
                <p className="text-gray-400">{expert.email}</p>
                <p className="text-gray-400">{expert.phone}</p>
                <p className="text-gray-400 italic mb-4">{expert.bio}</p>
                <p className="text-gray-400">
                </p>
            </div>

            {/* Expertise Section */}
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Expertise</h2>
                <ul className="list-disc list-inside text-white">
                    {expert.expertise.map((skill, index) => (
                        <li key={index} className="mb-2">
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Posts Section */}
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Your Posts</h2>
                {posts.length > 0 ? (
                    <ul className="space-y-4">
                        {posts.map((post) => (
                            <li key={post.id} className="text-white border-b border-gray-700 pb-2">
                                <h3 className="text-xl">{post.title}</h3>
                                <p className="text-gray-400 text-sm">Posted on: {post.date}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400">You haven't posted anything yet.</p>
                )}
            </div>

            {/* Social Links Section */}
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Social Links</h2>
                <ul className="text-white space-y-2">
                    <li>
                        <a
                            href={expert.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a
                            href={expert.socialLinks.X}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            X
                        </a>
                    </li>
                    <li>
                        <a
                            href={expert.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            GitHub
                        </a>
                    </li>
                </ul>
            </div>

            {/* Login and Logout Buttons */}
            <div className="flex space-x-4 mt-8">
                <button
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
                >
                    Login
                </button>
                <button
                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
                >
                    Logout
                </button>
            </div>
        </main>
    );
}