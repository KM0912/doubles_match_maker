declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    __GA_INITIALIZED__?: boolean;
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID;

export function isAnalyticsEnabled(): boolean {
  return import.meta.env.PROD && Boolean(GA_TRACKING_ID);
}

function canUseDOM() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function initAnalytics(): void {
  if (!canUseDOM()) return;
  if (!isAnalyticsEnabled()) return;

  if (window.__GA_INITIALIZED__) return;
  if (document.getElementById('ga-gtag')) {
    window.__GA_INITIALIZED__ = true;
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.id = 'ga-gtag';
  document.head.appendChild(script);

  const inlineScript = document.createElement('script');
  inlineScript.id = 'ga-inline';
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
  if (!isAnalyticsEnabled()) return;

  if (!window.__GA_INITIALIZED__) initAnalytics();

  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, { page_path: path });
  }
}
