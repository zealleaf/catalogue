import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'

module.exports = defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'catalogue',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }
    },
    outDir: path.resolve(__dirname, 'lib')
  },
  plugins: [
    dts({
      outputDir: './types'
    }),
    react({
      babel: {
        plugins: ['@emotion/babel-plugin']
      },
      jsxImportSource: '@emotion/react'
    })
  ]
})
