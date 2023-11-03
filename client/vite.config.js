import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './build',
  },
  server: {
    open: true,
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@data': path.resolve(__dirname, 'src/data'),
    },
  },
});
