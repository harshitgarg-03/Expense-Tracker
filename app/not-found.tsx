"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-900 to-black text-white px-4">
      
      {/* Big 404 */}
      <h1 className="text-8xl font-extrabold tracking-widest text-blue-500 animate-pulse">
        404
      </h1>

      {/* Message */}
      <p className="text-xl mt-4 text-gray-300 text-center">
        Oops! The page you're looking for doesn’t exist.
      </p>

      {/* Subtext */}
      <p className="text-sm mt-2 text-gray-500 text-center">
        It might have been removed, renamed, or never existed.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white font-medium shadow-lg"
      >
        Go Back Home
      </Link>

      {/* Extra design element */}
      <div className="absolute bottom-10 text-gray-600 text-xs">
        © {new Date().getFullYear()} Your App
      </div>
    </div>
  );
}