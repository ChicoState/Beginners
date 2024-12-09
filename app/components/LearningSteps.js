"use client";

export default function LearningSteps({
  learningSteps,
  isFromCache,
  searchQuery,
  isLoading,
}) {
  if (!learningSteps && !searchQuery) return null;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-xl border border-gray-800 shadow-xl relative overflow-hidden transition-all duration-500 ease-in-out">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>
      )}

      {learningSteps?.success ? (
        <>
          <ol className="list-decimal pl-6 space-y-4">
            {learningSteps.steps.map((step, index) => (
              <li
                key={index}
                className="text-lg text-white/90 font-light transform transition-all duration-300 hover:translate-x-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {step}
              </li>
            ))}
          </ol>
          {!isLoading && (
            <div className="flex items-center mt-4 space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isFromCache ? "bg-green-400" : "bg-blue-400"
                } animate-pulse`}
              ></div>
              <p className="text-sm font-light">
                <span
                  className={
                    isFromCache ? "text-green-400/70" : "text-blue-400/70"
                  }
                >
                  {isFromCache ? "(Loaded from cache)" : "(Fresh from AI)"}
                </span>
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          {/* Loading Skeleton */}
          {isLoading && (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="animate-pulse flex space-x-4"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <div className="h-4 bg-gray-700/50 rounded w-full"></div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
