// Lightweight Google Analytics helper
// - Initializes GA only in production and when tracking ID is set
// - Prevents double insertion
// - Exposes `pageview` to manually send PVs on route changes

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    __GA_INITIALIZED__?: boolean;
  }
}

export const GA_TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

const isProduction = process.env.NODE_ENV === "production";

function canUseDOM() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function initAnalytics(): void {
  if (!canUseDOM()) return;
  if (!isProduction) return;
  if (!GA_TRACKING_ID) return;

  // Avoid double initialization (e.g., React StrictMode re-invoking effects)
  if (window.__GA_INITIALIZED__) return;
  if (document.getElementById("ga-gtag")) {
    window.__GA_INITIALIZED__ = true;
    return;
  }

  // Load gtag.js
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.id = "ga-gtag";
  document.head.appendChild(script);

  // Inline init
  const inlineScript = document.createElement("script");
  inlineScript.id = "ga-inline";
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}');
  `;
  document.head.appendChild(inlineScript);

  window.__GA_INITIALIZED__ = true;
}

export function pageview(path: string): void {
  if (!canUseDOM()) return;
  if (!isProduction) return;
  if (!GA_TRACKING_ID) return;

  // Ensure initialized before sending
  if (!window.__GA_INITIALIZED__) initAnalytics();

  if (typeof window.gtag === "function") {
    // Standard SPA pageview
    window.gtag("config", GA_TRACKING_ID, { page_path: path });
  }
}

