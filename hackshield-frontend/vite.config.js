import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',  // Forces IPv4
    port: 5173,         // Optional: explicitly set port
    strictPort: true,   // Fail if port is busy
  },
})