import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  // Build into the repo-level `docs/jsoner/` folder so GitHub Pages can serve it from the main branch
  base: './',
  build: {
    outDir: '../docs/jsoner',
    emptyOutDir: true,
    assetsDir: 'assets'
  }
})
