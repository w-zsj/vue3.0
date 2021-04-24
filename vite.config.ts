import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/', // 打包路径
  build: {
    // outDir: './dist',
    assetsDir: `assets/[name]`,
    cssCodeSplit: true,
    assetsInlineLimit: 1024 * 5
  },
  server: {
    open: true,
    host: 'localhost',
    port: 15010,
  },
  // 引用全局 scss
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/css/app.scss";'
      }
    }
  },
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
      "@": path.resolve(__dirname, "src"),
      "comps": path.resolve(__dirname, "src/components"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})


