import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 5189,
    host: true,
  },
  plugins: [react()],
})