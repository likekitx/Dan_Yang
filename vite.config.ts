import { defineConfig } from 'vite'
import { join } from 'path'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
  ],
  base:'/',
  resolve:{
    alias:{
      '@': join(__dirname, "src"),
    }
  },
  server: {
    host: 'relinex.cn',
    port: 801,
    proxy: {
      "/wx": {
        target: "http://relinex.cn:3742",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wx/, "")
      },
    },
  },
  define: {
    'process.env': {}
  }
})