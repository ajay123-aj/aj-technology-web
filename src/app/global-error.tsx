"use client";

import { useEffect } from "react";

function getErrorMessage(err: unknown): string {
  if (err instanceof globalThis.Error) return err.message || "An unexpected error occurred.";
  if (typeof err === "string") return err;
  return "An unexpected error occurred.";
}

/**
 * Catches errors in the root layout (normal app/error.tsx does not).
 */
export default function GlobalError({
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
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-[#0a0e1a] text-[#e2e8f0] px-6 font-sans antialiased">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-white/70 text-center max-w-md mb-6 text-sm leading-relaxed">
          {getErrorMessage(error)}
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
      </body>
    </html>
  );
}
