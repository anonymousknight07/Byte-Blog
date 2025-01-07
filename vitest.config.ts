import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./src/__tests__/setup.ts'],
    globals: true,
    testTimeout: 30000, 
    hookTimeout: 30000, 
    // threads: false, // Disable worker threads for debugging purposes (optional)
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
