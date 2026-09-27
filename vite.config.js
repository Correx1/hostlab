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
        main: resolve(__dirname, 'index.html'),
        hosting: resolve(__dirname, 'hosting.html'),
        vps: resolve(__dirname, 'vps-hosting.html'),
        domains: resolve(__dirname, 'domains.html'),
        email: resolve(__dirname, 'business-email.html'),
        contact: resolve(__dirname, 'contact.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
});
