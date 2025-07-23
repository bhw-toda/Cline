import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import playformCompress from '@playform/compress';
import enableHMR from './plugin/enableHMR';
import { extname } from 'path';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  outDir: 'htdocs',
  base: '/',
  server: {
    host: true,
    port: 3000,
    open: true,
  },
  compressHTML: false,
  integrations: [
    react(),
    playformCompress({
      HTML: false,
      SVG: false,
      CSS: false,
    }),
  ],
  vite: {
    plugins: [enableHMR()],
    server: {
      hmr: {
        overlay: false, // エラー時のオーバーレイ表示を無効化
        protocol: 'ws', // 必要に応じて WebSocket のプロトコルを指定
        port: 3031, // HMR 用のポートを指定
      },
      watch: {
        usePolling: true, // ファイルシステムの監視方法を変更
      },
    },
    build: {
      minify: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('css/')) {
              return id.split('/').pop()?.replace('.css', '');
            }
          },
          entryFileNames: 'assets/common/js/[name].js',
          assetFileNames: ({ name = '' }) => {
            const ext = extname(name);
            if (
              name === 'index' &&
              ['.css', '.scss', '.sass', '.less'].includes(ext)
            ) {
              return `assets/common/css/[name]${ext}`;
            } else if (
              ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)
            ) {
              return `assets/common/images/[name]${ext}`;
            } else if (['.woff', '.woff2', '.ttf', '.otf'].includes(ext)) {
              return `assets/common/fonts/[name]${ext}`;
            } else if (ext === '.json') {
              return `assets/common/data/[name]${ext}`;
            } else if (['.css', '.scss', '.sass', '.less'].includes(ext)) {
              return `assets/common/css/[name]${ext}`;
            } else {
              return `assets/common/[ext]/[name]${ext}`;
            }
          },
        },
      },
    },
  },
});