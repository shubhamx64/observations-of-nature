import { getCollection, type CollectionEntry } from 'astro:content';
import { sitePath } from './url';

export type Artwork = CollectionEntry<'artwork'>;
export type ArtworkCrop = NonNullable<Artwork['data']['crop']>;

export async function getArtworks() {
  const artworks = await getCollection('artwork', ({ data }) => !data.draft);
  // Astro resolves image dimensions after schema validation, so check bounds here.
  for (const { id, data: { image, crop } } of artworks) {
    if (crop && (crop.x + crop.width > image.width || crop.y + crop.height > image.height)) {
      throw new Error(`Artwork "${id}": crop must fit inside the original photograph.`);
    }
  }
  return artworks.sort((a, b) => a.data.displayOrder - b.data.displayOrder || a.id.localeCompare(b.id));
}

export const artworkUrl = (artwork: Artwork) => sitePath(`/artwork/${artwork.id}/`);
export const artworkAlt = (artwork: Artwork) => artwork.data.alt || `Painting: ${artwork.data.title}`;
