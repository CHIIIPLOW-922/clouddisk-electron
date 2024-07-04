import vue from '@vitejs/plugin-vue'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    server: {
      port: 8999,
      hmr: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080/clouddisk',
          changeOrigin: true, // 修改请求头的 Host 为目标服务器的 URL
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [vue()]
  }
})
