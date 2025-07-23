import path from 'path';
import chokidar, { FSWatcher } from 'chokidar';
import { fileURLToPath } from 'url';

// 現在の時刻をフォーマットする関数
const now = () => {
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');

  return {
    now,
    hour,
    minute,
    second,
  };
};

// HMRを有効にするプラグイン
const enableHMR = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return {
    name: 'enableHMR',
    apply: 'serve',
    configureServer(server) {
      // srcフォルダを監視
      const srcPath = path.resolve(__dirname, '../src');
      const watcher: FSWatcher = chokidar.watch(srcPath, {
        persistent: true,
      });

      const nowTime = now();
      console.log(
        `${nowTime.hour}:${nowTime.minute}:${nowTime.second} \x1b[32mwatching for file changes...\x1b[0m`,
      );

      let timeoutId: NodeJS.Timeout | null = null;

      // ファイルの変更イベントを監視
      watcher.on('change', (filePath: string) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
          const nowTime = now();

          // ファイルの変更を検知
          console.log(
            `${nowTime.hour}:${nowTime.minute}:${nowTime.second} \x1b[34m[watch]\x1b[0m /src${filePath.replace(srcPath, '').replace(/\\/g, '/')}`,
          );

          // 変更されたスクリプトのキャッシュを手動で削除
          if (server.moduleGraph) {
            const mod = server.moduleGraph.getModuleById(filePath);
            if (mod) {
              server.moduleGraph.invalidateModule(mod);
              console.log(
                `\x1b[31mCache cleared for module:\x1b[0m ${filePath}`,
              );
            }
          }

          // HMRをトリガー
          server.ws.send({
            type: 'full-reload',
            path: '*',
          });
        }, 100); // デバウンス時間 (100ミリ秒)
      });

      // Viteサーバーのクリーンアップ時にウォッチャーを閉じる
      server.httpServer?.on('close', () => {
        const nowTime = now();
        watcher
          .close()
          .then(() =>
            console.log(
              `${nowTime.hour}:${nowTime.minute}:${nowTime.second} \x1b[32mWatcher closed.\x1b[0m`,
            ),
          );
      });
    },
  };
};

export default enableHMR;