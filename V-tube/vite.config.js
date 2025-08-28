import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
const BackendUrl = import.meta.env.VITE_BACKEND_URL;

// https://vite.dev/config/
export default defineConfig({
    server: {
    proxy: {
      '/api': `${BackendUrl}`  
    }
  },
  plugins: [react(), svgr()],
})
