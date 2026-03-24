"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0e1a] text-[#e2e8f0] px-6">
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
      <p className="text-white/70 text-center max-w-md mb-6 text-sm leading-relaxed">
        {error.message || "An unexpected error occurred. You can try again or refresh the page."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-5 py-2.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
        style={{
          background: "linear-gradient(135deg, #7b61ff 0%, #3b82f6 50%, #00e5ff 100%)",
        }}
      >
        Try again
      </button>
    </div>
  );
}
