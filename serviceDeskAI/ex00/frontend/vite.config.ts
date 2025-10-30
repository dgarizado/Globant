import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      // Dev proxy: forward /api to backend server
      proxy: {
        '/api': {
          target: process.env.VITE_DEV_API_PROXY || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});