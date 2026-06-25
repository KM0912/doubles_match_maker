import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

type SiteConfig = {
  appName: string;
  title: string;
  description: string;
  keywords: string;
  siteUrl: string;
  themeColor: string;
  ogImage: string;
};

const siteConfig = JSON.parse(
  readFileSync(resolve(fileURLToPath(new URL('.', import.meta.url)), 'site.config.json'), 'utf-8'),
) as SiteConfig;

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.siteUrl).toString();
}

function htmlMetaPlugin(): Plugin {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.appName,
    applicationCategory: 'SportsApplication',
    operatingSystem: 'Any',
    url: siteConfig.siteUrl,
    description: siteConfig.description,
  };

  const replacements: Record<string, string> = {
    APP_NAME: siteConfig.appName,
    APP_TITLE: siteConfig.title,
    APP_DESCRIPTION: siteConfig.description,
    APP_KEYWORDS: siteConfig.keywords,
    APP_SITE_URL: siteConfig.siteUrl,
    APP_THEME_COLOR: siteConfig.themeColor,
    APP_OG_IMAGE_URL: absoluteUrl(siteConfig.ogImage),
    APP_JSON_LD: JSON.stringify(jsonLd),
  };

  return {
    name: 'html-meta-from-site-config',
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (current, [key, value]) => current.replaceAll(`%${key}%`, value),
        html,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), htmlMetaPlugin()],
});
