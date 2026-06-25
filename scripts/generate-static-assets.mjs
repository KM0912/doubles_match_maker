import { mkdir, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const publicDir = resolve(root, 'public');
const config = JSON.parse(readFileSync(resolve(root, 'site.config.json'), 'utf-8'));

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="${escapeXml(config.appName)}">
  <rect width="512" height="512" rx="96" fill="${config.themeColor}"/>
  <path d="M92 122h328v268H92z" fill="#f8fbf7"/>
  <path d="M116 146h280v220H116z" fill="#136f63"/>
  <path d="M256 146v220M116 256h280M186 146v220M326 146v220" stroke="#f8fbf7" stroke-width="16" stroke-linecap="round"/>
  <circle cx="198" cy="214" r="20" fill="#f1c84b"/>
  <circle cx="314" cy="298" r="20" fill="#d95f43"/>
</svg>
`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${config.backgroundColor}"/>
  <rect x="76" y="70" width="1048" height="490" rx="36" fill="${config.themeColor}"/>
  <rect x="126" y="120" width="948" height="390" rx="12" fill="#f8fbf7"/>
  <rect x="164" y="158" width="872" height="314" rx="8" fill="#136f63"/>
  <path d="M600 158v314M164 315h872M314 158v314M886 158v314" stroke="#f8fbf7" stroke-width="18" stroke-linecap="round"/>
  <circle cx="403" cy="263" r="30" fill="#f1c84b"/>
  <circle cx="797" cy="367" r="30" fill="#d95f43"/>
  <text x="164" y="565" fill="#14221c" font-family="-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif" font-size="52" font-weight="800">${escapeXml(config.appName)}</text>
</svg>
`;

const manifest = {
  name: config.appName,
  short_name: config.shortName,
  description: config.description,
  start_url: '.',
  display: 'standalone',
  background_color: config.backgroundColor,
  theme_color: config.themeColor,
  icons: [
    {
      src: '/favicon.svg',
      sizes: 'any',
      type: 'image/svg+xml',
      purpose: 'any maskable',
    },
  ],
};

const robots = `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', config.siteUrl).toString()}
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(config.siteUrl)}</loc>
  </url>
</urlset>
`;

await mkdir(publicDir, { recursive: true });
await Promise.all([
  writeFile(resolve(publicDir, 'favicon.svg'), iconSvg),
  writeFile(resolve(publicDir, 'apple-touch-icon.svg'), iconSvg),
  writeFile(resolve(publicDir, 'og-image.svg'), ogSvg),
  writeFile(resolve(publicDir, 'manifest.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`),
  writeFile(resolve(publicDir, 'robots.txt'), robots),
  writeFile(resolve(publicDir, 'sitemap.xml'), sitemap),
]);
