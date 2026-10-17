import type { APIRoute } from 'astro';
import { getArtworks, artworkUrl } from '../lib/artwork';
import { sitePath } from '../lib/url';

export const GET: APIRoute = async ({ site }) => {
  const paths = [...['/', '/gallery/', '/about/', '/contact/'].map(sitePath), ...(await getArtworks()).map(artworkUrl)];
  const escape = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  const entries = site ? paths.map(path => `<url><loc>${escape(new URL(path, site).href)}</loc></url>`).join('') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
