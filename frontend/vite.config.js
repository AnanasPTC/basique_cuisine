import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/public',  // Chemin vers le public de Laravel
    emptyOutDir: false,           // Ne pas effacer le public entier
  },
  resolve: {
    alias: {
      '@mui/styled-engine': '@emotion/styled',  // Force l'utilisation d'Emotion
    },
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'],  // Force l'inclusion pour Vite
  },
})
