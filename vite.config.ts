import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'API_HERE', // Backend Laravel
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
