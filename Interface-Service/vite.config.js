import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // used so Docker Container port mapping works
    strictPort: true,
    port: 3000, // port we are using, can be changed
  }
})
