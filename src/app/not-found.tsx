"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="bg-black text-white px-6 py-3 rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
}
