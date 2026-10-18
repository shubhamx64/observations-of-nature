import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const artwork = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artwork' }),
  schema: ({ image }) => z.object({
    title: z.string().min(1),
    image: image(),
    // User-approved display framing, measured in the original photograph's pixels.
    // Removing this field restores the whole photograph without editing any image.
    crop: z.object({
      x: z.number().int().nonnegative(),
      y: z.number().int().nonnegative(),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    }).optional(),
    frameStyle: z.enum(['wood', 'green', 'navyCream', 'darkGreen']).default('wood'),
    alt: z.string().min(1).optional(),
    year: z.union([z.string(), z.number()]).optional(),
    medium: z.string().optional(),
    dimensions: z.string().optional(),
    description: z.string().optional(),
    category: z.string().default('Other works'),
    additionalImages: z.array(z.object({ image: image(), alt: z.string().optional() })).default([]),
    available: z.boolean().optional(),
    price: z.string().optional(),
    featured: z.boolean().default(false),
    displayOrder: z.number().default(100),
    provisionalTitle: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { artwork };
