"use client";
import { useEffect, useState } from "react";

/**
 * Full-screen status gates for the whole site:
 *  - offline (browser has no connection) -> "Check your connection"
 *  - database unreachable (/api/health 503) -> "System under maintenance"
 *
 * Rendered by the root layout. Nothing is shown until a state is known,
 * so there is no flash of a status page on healthy loads.
 */

const btnBase: React.CSSProperties = {
  padding: "14px 32px",
  border: "none",
  borderRadius: 6,
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

function SystemOverlay({ variant }: { variant: "offline" | "maintenance" }) {
  const offline = variant === "offline";
  return (
    <div
      role="alert"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1b2133",
        color: "#ffffff",
        fontFamily: "'Poppins', system-ui, sans-serif",
        padding: "24px",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 16 }} aria-hidden="true">
          {offline ? "📡" : "🛠️"}
        </div>
        <h1
          style={{
            fontSize: 30,
            fontWeight: 800,
            margin: "0 0 12px",
            color: "#ffffff",
            letterSpacing: 0.5,
          }}
        >
          {offline ? "Check Your Connection" : "System Under Maintenance"}
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "#c2c9da", margin: "0 0 28px" }}>
          {offline
            ? "You appear to be offline. Please check your internet connection and try again."
            : "We are having trouble reaching our systems right now. Please try again in a few minutes — we should be back shortly."}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{ ...btnBase, backgroundColor: "#43ba7f" }}
          >
            Try Again
          </button>
          <a href="/contact-us" style={{ ...btnBase, backgroundColor: "#ff511a" }}>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export function SystemStatusGate() {
  const [offline, setOffline] = useState(false);
  const [dbDown, setDbDown] = useState<boolean | null>(null);

  useEffect(() => {
    const updOffline = () => setOffline(!navigator.onLine);
    updOffline();
    window.addEventListener("online", updOffline);
    window.addEventListener("offline", updOffline);

    let cancelled = false;

    const checkDb = async () => {
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        if (!cancelled) setDbDown(res.status === 503);
      } catch {
        // Browser online but the request failed -> treat as unreachable;
        // the offline overlay still takes priority when truly offline.
        if (!cancelled) setDbDown(true);
      }
    };

    checkDb();
    const id = window.setInterval(checkDb, 60_000);
    const onReconnect = () => {
      if (navigator.onLine) checkDb();
    };
    window.addEventListener("online", onReconnect);

    return () => {
      cancelled = true;
      window.removeEventListener("online", updOffline);
      window.removeEventListener("offline", updOffline);
      window.removeEventListener("online", onReconnect);
      window.clearInterval(id);
    };
  }, []);

  if (offline) return <SystemOverlay variant="offline" />;
  if (dbDown === true) return <SystemOverlay variant="maintenance" />;
  return null;
}