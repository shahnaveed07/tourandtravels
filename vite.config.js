import { defineConfig } from 'vite';

export default defineConfig(() => {
  // Primary production domain is https://www.bittkashmir.in/ at the domain root ('/').
  // VITE_BASE_PATH remains available as an explicit override if ever needed.
  const base = process.env.VITE_BASE_PATH || '/';

  return {
    base,
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
    },
  };
});
