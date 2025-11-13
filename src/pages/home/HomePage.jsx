import React from "react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-xl w-full flex flex-col items-center">
        <img src="/vite.svg" alt="React Logo" className="w-20 h-20 mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Welcome Home!</h2>
        <p className="text-gray-600 text-center mb-6">
          This is the main content of your single-page application. <br />
          Start building your awesome React project with this boilerplate!
        </p>
        <div className="flex gap-4">
          <a
            href="/home"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-semibold shadow"
          >
            Dashboard
          </a>
          <a
            href="/login"
            className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition-colors font-semibold"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
