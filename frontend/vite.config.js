import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/public',  // Chemin vers le public de Laravel
    emptyOutDir: false,           // Pour ne pas effacer le public entier
  },
})
