"use client";

import { useEffect } from "react";

// Non-critical stylesheets are injected after first paint so they
// stop render-blocking the page on slow connections (Lighthouse:
// "Render-blocking requests"). A <noscript> fallback is rendered in
// the layout for browsers without JavaScript.
const NON_BLOCKING_CSS = ["/assets/css/fontawesome.css"];

export default function AsyncCss() {
  useEffect(() => {
    const loaded = new Set(
      Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((l) =>
        (l as HTMLLinkElement).getAttribute("href")
      )
    );
    NON_BLOCKING_CSS.forEach((href) => {
      if (!loaded.has(href)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        (document.head ?? document.documentElement).appendChild(link);
      }
    });
  }, []);

  return null;
}