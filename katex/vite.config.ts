import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ['e2e/**/*', '**/*.spec.ts', '**/*.test.ts', 'vite.config.ts', 'vite.css.config.ts'],
      outDir: 'dist',
      include: ['../src/**/*'],
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
  // Exclude e2e directory from build
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, '../src/index_katex.tsx'),
      name: 'ReactIpynbRendererKatex',
      fileName: (format) => format === 'umd' ? 'index.js' : 'index',
      formats: ['umd']
    },
    rollupOptions: {
      external: [/^react/, /^@?react-dom/],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: false,
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
