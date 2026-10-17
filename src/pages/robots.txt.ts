import type { APIRoute } from 'astro';
import { sitePath } from '../lib/url';

export const GET: APIRoute = ({ site }) => new Response(
  site ? `User-agent: *\nAllow: /\nSitemap: ${new URL(sitePath('/sitemap.xml'), site).href}\n` : 'User-agent: *\nDisallow: /\n',
  { headers: { 'Content-Type': 'text/plain' } },
);
