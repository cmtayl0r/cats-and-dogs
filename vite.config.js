import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
    // Base public path when served in production.
    base: '/',
    // Directory to serve as plain static assets.
    publicDir: 'public',
    // Directory where the build output will be placed.
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    // Plugins configuration.
    plugins: [
        // You can add Vite plugins here if needed.
        legacy({
            targets: ['defaults', 'not IE 11'],
        }),
    ],
});
