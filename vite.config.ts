import tailwindcss from '@tailwindcss/vite'
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // ✅ Force Vite à utiliser la bonne entrée de vercel analytics
      "@vercel/analytics/react": "@vercel/analytics/dist/react/index.mjs",
    },
  },
  optimizeDeps: {
    include: ["@vercel/analytics/react"], // ✅ prébuild côté React
  },
})
