import { glob } from "glob";

/**
 * 从目标目录中过滤出待压缩的 png 文件
 *
 * @param dir 目标目录
 * @param pattern glob pattern
 *
 * @returns 待压缩的 png 文件数组
 */
export async function filter(dir: string, pattern: string | string[]) {
  const compressedImages = await glob(pattern, {
    cwd: dir,
    absolute: true,
  });

  return compressedImages;
}
