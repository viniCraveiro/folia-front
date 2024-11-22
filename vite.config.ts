import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../folia/src/main/resources/static', // Caminho para o diretório estático do backend
    emptyOutDir: true, // Limpa o diretório antes de cada build (opcional, mas útil)
  },

  optimizeDeps: {
    include: ['@mui/material/Tooltip', '@emotion/styled', 'date-fns'],
  },
})
