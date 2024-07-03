/**
 * @module
 * 
 * 本模块是 vite 插件，使用 pngquant 工具对 png
 * 格式的图片进行压缩
 * 
 * @example
 * ```
 * ```
 */

import { promises as fs } from "node:fs";
import { join } from "node:path";
import { exec } from 'node:child_process';
import which from 'which';
import type { Plugin } from 'vite';

const fileRegex = /\.(png)$/
let hasReported = false;

/**
 * 使用 pngquant 压缩 png 图片
 */
export default function compressPng (): Plugin {
  return {
    name: 'vite-plugin-compress-png',
     
    async writeBundle(output) {
      if (hasReported) {
        // 已经检测到 pngquant 工具不存在
        return
      }

      const resolvedOrNull = await which('pngquant', { nothrow: true });
      if (resolvedOrNull === null && !hasReported) {
        console.log('未找到图片压缩工具pngquant');
        hasReported = true;
        return;
      }
      const dir = output.dir;
      if (!dir) {
        return
      }
      const assetsPath = join(dir, "assets");
      const imageFiles = await fs.readdir(assetsPath);
      const compressedImages = imageFiles.filter((file: string) =>
        fileRegex.test(file)
      );

      for (const imageFile of compressedImages) {
        const inputPath = join(assetsPath, imageFile);
        exec(`pngquant --force --ext .png --quality 80 ${inputPath}`);
      }
    },
  }
}
