import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
  const base = process.env.VITE_BASE_PATH || (isGitHubActions ? '/tourandtravels/' : '/');

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
