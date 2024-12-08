"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import placeholderImage from "../../public/pictures/expert-placeholder.png";

// Initial experts data with guides
const initialExperts = {
  python: {
    name: "Dr. Sarah Chen",
    title: "Senior Python Developer & Educator",
    expertise: "Python, Data Science, Machine Learning",
    contact: "@pythonexpert",
    image: placeholderImage,
    keywords: [
      "python",
      "programming",
      "coding",
      "data science",
      "machine learning",
      "ai",
      "artificial intelligence",
      "development",
      "software",
    ],
    guides: [
      {
        title: "Getting Started with Python",
        content:
          "A comprehensive guide for beginners learning Python programming.",
        steps: [
          "Install Python and set up your development environment",
          "Learn basic syntax and data types",
          "Understand control flow and functions",
          "Work with modules and packages",
          "Practice with real-world projects",
        ],
      },
      {
        title: "Python for Data Science",
        content:
          "Essential Python skills for data analysis and machine learning.",
        steps: [
          "Master NumPy and Pandas libraries",
          "Learn data visualization with Matplotlib",
          "Understand statistical analysis basics",
          "Build machine learning models with scikit-learn",
          "Create data pipelines",
        ],
      },
    ],
  },
  cooking: {
    name: "Chef Michael Rodriguez",
    title: "Professional Chef & Culinary Instructor",
    expertise: "International Cuisine, Baking, Food Science",
    contact: "@chefmichael",
    image: placeholderImage,
    keywords: [
      "cooking",
      "chef",
      "food",
      "cuisine",
      "baking",
      "kitchen",
      "culinary",
      "recipe",
      "gastronomy",
      "meal",
      "cooking techniques",
    ],
    guides: [],
  },
  guitar: {
    name: "James Wilson",
    title: "Professional Guitarist & Music Teacher",
    expertise: "Classical Guitar, Music Theory, Performance",
    contact: "@guitarmaster",
    image: placeholderImage,
    keywords: [
      "guitar",
      "music",
      "instrument",
      "musical",
      "acoustic",
      "electric",
      "classical",
      "playing",
      "performance",
      "musician",
      "band",
    ],
    guides: [],
  },
  test: {
    name: "Dr. Emily Parker",
    title: "Quality Assurance & Testing Expert",
    expertise: "Software Testing, Test Automation, QA Methodologies",
    contact: "@testpro",
    image: placeholderImage,
    keywords: [
      "test",
      "testing",
      "qa",
      "quality assurance",
      "automation",
      "software testing",
      "unit testing",
      "integration testing",
      "quality control",
    ],
    guides: [],
  },
  software: {
    name: "Alex Thompson",
    title: "Software Engineering Lead",
    expertise: "Full-Stack Development, System Architecture, Best Practices",
    contact: "@devexpert",
    image: placeholderImage,
    keywords: [
      "software",
      "development",
      "programming",
      "coding",
      "web",
      "full-stack",
      "backend",
      "frontend",
      "architecture",
      "engineering",
    ],
    guides: [],
  },
  math: {
    name: "Dr. Robert Chen",
    title: "Mathematics Professor & Researcher",
    expertise: "Advanced Mathematics, Statistics, Problem Solving",
    contact: "@mathwhiz",
    image: placeholderImage,
    keywords: [
      "math",
      "mathematics",
      "statistics",
      "calculus",
      "algebra",
      "geometry",
      "trigonometry",
      "probability",
      "equations",
      "numbers",
    ],
    guides: [],
  },
  game: {
    name: "Lisa Martinez",
    title: "Game Development Director",
    expertise: "Game Design, Unity, Unreal Engine, Game Programming",
    contact: "@gamedev",
    image: placeholderImage,
    keywords: [
      "game",
      "gaming",
      "game development",
      "unity",
      "unreal",
      "game design",
      "game programming",
      "video games",
      "3d",
      "interactive",
    ],
    guides: [],
  },
};

export default function ExpertCard({ topic }) {
  const [experts, setExperts] = useState(initialExperts);
  const [isAddingGuide, setIsAddingGuide] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showGuides, setShowGuides] = useState(false);
  const [newGuide, setNewGuide] = useState({
    title: "",
    content: "",
    steps: [],
  });
  const [currentStep, setCurrentStep] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load experts from localStorage on mount
  useEffect(() => {
    const storedExperts = localStorage.getItem("experts");
    if (storedExperts) {
      setExperts(JSON.parse(storedExperts));
    }
  }, []);

  const getExpertForTopic = (topic) => {
    if (!topic) return null;

    // First try exact match
    if (experts[topic.toLowerCase()]) {
      return experts[topic.toLowerCase()];
    }

    // Then try to find by keywords
    for (const [, expert] of Object.entries(experts)) {
      // Skip if expert or keywords is undefined
      if (!expert || !expert.keywords) continue;

      if (
        expert.keywords.some(
          (keyword) =>
            topic.toLowerCase().includes(keyword.toLowerCase()) ||
            keyword.toLowerCase().includes(topic.toLowerCase())
        )
      ) {
        return expert;
      }
    }

    // Instead of creating an AI Expert, return null
    return null;
  };

  const expert = getExpertForTopic(topic);

  const handleAddStep = (e) => {
    e.preventDefault();
    if (currentStep.trim()) {
      setNewGuide((prev) => ({
        ...prev,
        steps: [...prev.steps, currentStep.trim()],
      }));
      setCurrentStep("");
    }
  };

  const handleRemoveStep = (indexToRemove) => {
    setNewGuide((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmitGuide = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const topicKey = topic.toLowerCase();
      const updatedExperts = { ...experts };

      // Add the new guide
      const newGuideWithMetadata = {
        ...newGuide,
        createdAt: new Date().toISOString(),
        author: "Community Contributor",
      };

      if (!updatedExperts[topicKey]) {
        // Create a new topic entry with all required fields
        updatedExperts[topicKey] = {
          guides: [newGuideWithMetadata],
          keywords: [topicKey], // Initialize with the topic as a keyword
          createdAt: new Date().toISOString(),
        };
      } else if (!updatedExperts[topicKey].guides) {
        // Ensure the guides array exists
        updatedExperts[topicKey].guides = [newGuideWithMetadata];
        // Ensure keywords exist
        if (!updatedExperts[topicKey].keywords) {
          updatedExperts[topicKey].keywords = [topicKey];
        }
      } else {
        // Add to existing guides
        updatedExperts[topicKey].guides.push(newGuideWithMetadata);
      }

      // Update state and localStorage
      setExperts(updatedExperts);
      localStorage.setItem("experts", JSON.stringify(updatedExperts));

      // Reset form
      setNewGuide({ title: "", content: "", steps: [] });
      setIsAddingGuide(false);
      setShowGuides(true); // Show the guides after adding
    } catch (error) {
      console.error("Error saving guide:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderGuideModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-blue-950 to-gray-900 p-6 rounded-xl border border-blue-800/30 shadow-xl max-w-2xl w-full">
        <h3 className="text-xl font-bold text-white mb-6">Add New Guide</h3>
        <form onSubmit={handleSubmitGuide} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Guide Title</label>
            <input
              type="text"
              value={newGuide.title}
              onChange={(e) =>
                setNewGuide((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
              placeholder="Enter guide title..."
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Guide Description</label>
            <textarea
              value={newGuide.content}
              onChange={(e) =>
                setNewGuide((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none h-24"
              placeholder="Enter guide description..."
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Steps</label>
            <div className="space-y-2">
              {newGuide.steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-gray-400">{index + 1}.</span>
                  <p className="flex-1 text-white">{step}</p>
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2 flex space-x-2">
              <input
                type="text"
                value={currentStep}
                onChange={(e) => setCurrentStep(e.target.value)}
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                placeholder="Enter a step..."
              />
              <button
                type="button"
                onClick={handleAddStep}
                className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
              >
                Add Step
              </button>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => {
                setIsAddingGuide(false);
                setNewGuide({ title: "", content: "", steps: [] });
                setCurrentStep("");
              }}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition duration-300 ease-in-out font-medium disabled:opacity-50"
              disabled={
                isSubmitting ||
                !newGuide.title ||
                !newGuide.content ||
                newGuide.steps.length === 0
              }
            >
              {isSubmitting ? "Saving..." : "Save Guide"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // If no expert exists, show the "Add First Guide" card
  if (!expert) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-b from-blue-950 to-gray-900 p-6 rounded-xl border border-blue-800/30 shadow-xl">
          <div className="text-center">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent mb-4">
              Be the First Guide
            </h3>
            <p className="text-white/70 mb-6">
              Share your knowledge about {topic} with the community. Create the
              first guide!
            </p>
            <button
              onClick={() => setIsAddingGuide(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition duration-300 ease-in-out font-medium"
            >
              Create Guide
            </button>
          </div>
        </div>

        {isAddingGuide && renderGuideModal()}
      </div>
    );
  }

  // Regular expert card display with guides
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-b from-blue-950 to-gray-900 p-6 rounded-xl border border-blue-800/30 shadow-xl">
        <div className="flex items-start space-x-6">
          <div
            className="relative cursor-pointer"
            onClick={() => setShowGuides(!showGuides)}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full opacity-20 blur-sm"></div>
            <div className="w-24 h-24 rounded-full relative z-10 border-2 border-blue-500/30 overflow-hidden bg-gray-800">
              <Image
                src={placeholderImage}
                alt={expert.name}
                className="w-full h-full object-cover relative z-10 transition-opacity duration-300"
                priority
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              {expert.name}
            </h3>
            <p className="text-blue-300 font-medium">{expert.title}</p>
            <p className="text-white/70 mt-2 font-light">{expert.expertise}</p>
            <p className="text-blue-400 mt-2 font-medium">{expert.contact}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setShowGuides(!showGuides)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition duration-300 ease-in-out text-sm font-medium"
              >
                {showGuides ? "Hide Guides" : "View Guides"}
              </button>
              <button
                onClick={() => setIsAddingGuide(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 text-blue-400 rounded-lg transition duration-300 ease-in-out text-sm font-medium border border-blue-500/30"
              >
                Add New Guide
              </button>
            </div>
          </div>
        </div>

        {/* Expert Guides Section */}
        {showGuides && (
          <div className="mt-6 space-y-4">
            <h4 className="text-lg font-semibold text-blue-300">
              Expert Guides
            </h4>
            {expert.guides && expert.guides.length > 0 ? (
              <div className="space-y-4">
                {expert.guides.map((guide, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 p-4 rounded-lg border border-blue-800/20 hover:border-blue-600/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedGuide(guide)}
                  >
                    <h5 className="text-white font-medium">{guide.title}</h5>
                    <p className="text-gray-400 text-sm mt-1">
                      {guide.content}
                    </p>
                    {guide.author && (
                      <p className="text-blue-400/70 text-sm mt-2">
                        By {guide.author}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No guides available yet.</p>
            )}
          </div>
        )}

        {/* Selected Guide Modal */}
        {selectedGuide && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-b from-blue-950 to-gray-900 p-6 rounded-xl border border-blue-800/30 shadow-xl max-w-2xl w-full">
              <h3 className="text-xl font-bold text-white mb-4">
                {selectedGuide.title}
              </h3>
              <p className="text-gray-300 mb-6">{selectedGuide.content}</p>
              <ol className="list-decimal list-inside space-y-2">
                {selectedGuide.steps.map((step, index) => (
                  <li key={index} className="text-white/80">
                    {step}
                  </li>
                ))}
              </ol>
              <button
                onClick={() => setSelectedGuide(null)}
                className="mt-6 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add Guide Modal */}
        {isAddingGuide && renderGuideModal()}
      </div>

      {/* Share Your Expertise Card */}
      <div className="bg-gradient-to-b from-blue-950 to-gray-900 p-6 rounded-xl border border-blue-800/30 shadow-xl">
        <div className="text-center">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent mb-4">
            Share Your Expertise
          </h3>
          <p className="text-white/70 mb-6">
            Have knowledge about {topic} to share? Create a guide and help
            others learn!
          </p>
          <button
            onClick={() => setIsAddingGuide(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition duration-300 ease-in-out font-medium"
          >
            Create New Guide
          </button>
        </div>
      </div>
    </div>
  );
}
