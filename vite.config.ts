import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'
import { svgBuilder } from './src/plugins/svgBuilder';
// https://vitejs.dev/config/
// 是否为开发环境
const isDev = process.env.NODE_ENV === 'production'
// console.log(`process`, process.env.NODE_ENV)
export default defineConfig({
  mode: isDev ? 'production' : 'development',
  server: {
    open: true,
    host: 'localhost',
    port: 15010,
  },
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          name = name.slice(3)
          return `element-plus/packages/theme-chalk/src/${name}.scss`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      }]
    }),
    svgBuilder('./src/icons/svg/')
  ],
  base: '/', // 打包路径
  build: {
    outDir: 'dist',
    assetsDir: `assets/[name]`,
    cssCodeSplit: true,
    assetsInlineLimit: 1024 * 5,
    rollupOptions: {
      output: {
        manualChunks: {
          Plus: ["axios", "element-plus", "vue-router", 'vant'],
        },
        minifyInternalExports: false
      }
    },
    sourcemap: false,
    manifest: false,
    chunkSizeWarningLimit: 500, //chunk 大小警告的限制（以 kbs 为单位）。默认500
  },
  // 引入第三方的配置
  optimizeDeps: {
    exclude: ['node_modules']
  },
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
      "@": path.resolve(__dirname, "src"),
      "comps": path.resolve(__dirname, "src/components"),
    },
    extensions: ['.js', '.ts', '.json', '.vue']
  },
  // 引用全局 scss
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/assets/css/app.scss";`
      }
    }
  },
})


