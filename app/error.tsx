"use client"; // Error components must be Client components
import React from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="my-16 dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto text-center">
          <h1 className="mb-4 font-extrabold tracking-tight text-7xl lg:text-9xl text-primary-600 dark:text-primary-500">
            Something wrong
          </h1>
          <p className="p-2 mb-4 text-lg font-light text-white bg-red-500 dark:bg-red-400 dark:text-white">
            {error.message}
          </p>

          <div className="flex justify-around mt-2">
            <Link
              href="#"
              className="inline-flex p-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4"
            >
              Back to Homepage
            </Link>

            <button
              className="p-2 text-white bg-gray-600 rounded-lg"
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
