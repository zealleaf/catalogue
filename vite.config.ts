import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

module.exports = defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
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
        external: ['react', 'react-dom', '@emotion/react'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'reactDom',
            '@emotion/react': 'emotionReact'
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
      react({
        babel: {
          plugins: ['@emotion/babel-plugin']
        },
        jsxImportSource: '@emotion/react'
      }),
      visualizer({ open: false })
    ]
  }
})
