// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://iajensen222222.github.io',
  base: '/AuraShell-Website',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
