import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@":  path.resolve(__dirname, './src'),
    }
  },
  build: {
    // Split large third-party libs into stable, separately-cached chunks so a
    // change to app code doesn't invalidate the vendor bundles.
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'gsap': ['gsap'],
          'lenis': ['lenis'],
        },
      },
    },
  },
});
