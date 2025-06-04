import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    middleware: [
      (req, res, next) => {
        if (req.url.includes('.')) return next();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync('index.html'));
      },
    ],
  },
  preview: {
    port: 5173,
  },
});