import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// vite.config.ts
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          build: {
            rollupOptions: {
              // We add the worker as an additional entry point
              input: {
                main: path.join(__dirname, 'electron/main.ts'),
                'emailWorker': path.join(__dirname, 'src/workers/emailSending/emailWorker.ts'),
              },
              output: {
                // This ensures it outputs to dist-electron/emailWorker.js
                entryFileNames: '[name].js', 
              }
            }
          }
        }
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
      },
    }),
  ],
})