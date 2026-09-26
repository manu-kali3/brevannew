"use client";

import { useEffect } from "react";
import Link from "next/link";

/** Error messages that indicate the user's own connection failed. */
const NETWORK_PATTERNS = [
  /failed to fetch/i,
  /networkerror/i,
  /load failed/i,
  /fetch failed/i,
  /econnrefused/i,
  /econnreset/i,
  /enotfound/i,
  /timed out/i,
  /network request failed/i,
  /typeerror.*fetch/i,
];

function isNetworkError(error: Error): boolean {
  if (typeof navigator !== "undefined" && navigator.onLine === false) return true;
  return NETWORK_PATTERNS.some((re) => re.test(error?.message ?? ""));
}

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const network = isNetworkError(error);

  return (
    <section className="error-page">
      <div className="error-inner">
        <div className="error-code" aria-hidden="true">
          {network ? "Offline" : "500"}
        </div>
        <h1>{network ? "Check Your Connection" : "Something Went Wrong"}</h1>
        <p>
          {network
            ? "We couldn't reach the server. Please check your internet connection and try again."
            : "An unexpected error occurred while loading this page. Please try again, or contact us if the problem persists."}
        </p>
        <div className="error-actions">
          <div className="green-button">
            <button type="button" onClick={() => retry()}>
              Try Again
            </button>
          </div>
          <div className="orange-button">
            <Link href="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}