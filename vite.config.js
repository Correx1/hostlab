import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
  server: {
    port: 3000,
    open: false,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        hosting: resolve(import.meta.dirname, 'hosting.html'),
        vps: resolve(import.meta.dirname, 'vps-hosting.html'),
        domains: resolve(import.meta.dirname, 'domains.html'),
        email: resolve(import.meta.dirname, 'business-email.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        admin: resolve(import.meta.dirname, 'admin.html'),
        dashboard: resolve(import.meta.dirname, 'dashboard.html'),
      },
    },
  },
});
