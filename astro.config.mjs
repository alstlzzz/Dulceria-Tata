import { defineConfig } from 'astro/config';
import db from '@astrojs/db';

export default defineConfig({
  integrations: [db()],
  output: 'server', // 👈 importante para que los endpoints funcionen
});
