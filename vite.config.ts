import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

module.exports = defineConfig(({ mode }) => {
  const IS_DEV = !!(mode === 'development')
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      modules: {
        generateScopedName: IS_DEV ? '[path][name]__[local]' : '[hash:base64:8]'
      }
    },
    build: {
      watch: process.env.VITE_SKIP_WATCH === 'true' ? null : {},
      target: 'es2015',
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: '@leafvein/catalogue',
        fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'reactDom'
          }
        }
      },
      minify: 'terser',
      outDir: path.resolve(__dirname, 'lib')
    },
    plugins: [
      process.env.VITE_SKIP_DTS === 'true'
        ? null
        : dts({
            outputDir: './types'
          }),
      react(),
      visualizer({ open: false })
    ]
  }
})
