import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import pkg from './package.json'
import copyright from './src/utils/copyright'

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
    AutoImport({
      dirs: ['./src/composables'],
      imports: ['vue', '@vueuse/core'],
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
          esm: true,
        }),
      ],
      dts: './imports.d.ts',
    }),
    Components({
      directoryAsNamespace: true,
      dirs: ['./src/components'],
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
          esm: true,
        }),
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [process.cwd() + '/src/assets/icons'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@prefix': 'umo',
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    lib: {
      entry: process.cwd() + '/src/components/index.js',
      name: pkg.name,
      fileName: 'umo-editor',
    },
    outDir: 'dist/es',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: [
        {
          banner: copyright,
          intro: `import './style.css'`,
          format: 'es',
        },
      ],
      external: [
        /@vueuse\/.*/,
        /@tiptap\/.*/,
        /prism-code-editor\/.*/,
        /nzh\/.*/,
        'vue',
        '@humanwhocodes/object-schema',
        '@imgly/background-removal',
        '@sereneinserenade/tiptap-search-and-replace',
        '@vue-monaco/editor',
        'dom-to-image-more',
        'es-drager',
        'file64',
        'file-saver',
        'hotkeys-js',
        'jsbarcode',
        'katex',
        'mermaid',
        'monaco-editor',
        'plyr',
        'pretty-bytes',
        'qrcode-svg',
        'simple-code-editor',
        'svg64',
        'vue-esign',
      ],
    },
  },
})
