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
import { exec } from "node:child_process";
import which from "which";
import type { Plugin } from "vite";
import { filter } from "./filter.ts";

export type CompressPngType = {
  pattern: string | string[];
};

const defaultOptions: CompressPngType = {
  pattern: "**/*.png",
};

/**
 * 使用 pngquant 压缩 png 图片
 */
export default function compressPng(
  options: CompressPngType = defaultOptions,
): Plugin {
  return {
    name: "vite-plugin-compress-png",

    async writeBundle(output) {
      const resolvedOrNull = await which("pngquant", { nothrow: true });
      if (resolvedOrNull === null) {
        console.log("未找到图片压缩工具pngquant");
        return;
      }

      const dir = output.dir;
      if (!dir) {
        return;
      }

      const compressed = await filter(dir, options.pattern);

      for (const imageFile of compressed) {
        exec(`pngquant --force --ext .png --quality 80 ${imageFile}`);
      }
    },
  };
}
