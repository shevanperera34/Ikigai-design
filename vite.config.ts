import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repo from /Ikigai-design/
  base: process.env.GITHUB_ACTIONS ? '/Ikigai-design/' : '/',
})
