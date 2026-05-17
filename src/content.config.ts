import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    updated: z.string(),
  }),
});

const releases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/releases' }),
  schema: z.object({
    version: z.string(),
    date: z.string(),
    title: z.string(),
    prerelease: z.boolean().default(false),
  }),
});

export const collections = { legal, releases };
