import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/rsvp_service/',  // <-- MUST match your GitHub repo name
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
