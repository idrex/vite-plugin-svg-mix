/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';

import svgPlugin from './src/index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgPlugin({
      include: resolve(process.cwd(), 'src/assets'),
      prefix: 'icon',
    }),
  ],
});
