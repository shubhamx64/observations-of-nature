import { defineConfig } from 'astro/config';

// Set SITE_URL to the final public origin when deploying, e.g. https://your-domain.com.
// Leaving it unset keeps this preview out of search indexes and avoids invented URLs.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
