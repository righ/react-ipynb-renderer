import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        'default': resolve(__dirname, 'src/styles/default.less'),
        'dark': resolve(__dirname, 'src/styles/dark.less'),
        'darkbronco': resolve(__dirname, 'src/styles/darkbronco.less'),
        'dorkula': resolve(__dirname, 'src/styles/dorkula.less'),
        'chesterish': resolve(__dirname, 'src/styles/chesterish.less'),
        'grade3': resolve(__dirname, 'src/styles/grade3.less'),
        'gruvboxd': resolve(__dirname, 'src/styles/gruvboxd.less'),
        'gruvboxl': resolve(__dirname, 'src/styles/gruvboxl.less'),
        'monokai': resolve(__dirname, 'src/styles/monokai.less'),
        'oceans16': resolve(__dirname, 'src/styles/oceans16.less'),
        'onedork': resolve(__dirname, 'src/styles/onedork.less'),
        'solarizedd': resolve(__dirname, 'src/styles/solarizedd.less'),
        'solarizedl': resolve(__dirname, 'src/styles/solarizedl.less'),
      },
      output: {
        dir: 'dist/styles',
        entryFileNames: '[name].css',
        assetFileNames: '[name].[ext]',
        manualChunks: undefined
      }
    },
    outDir: 'dist/styles',
    emptyOutDir: true,
  },
}))
