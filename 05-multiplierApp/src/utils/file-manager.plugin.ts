import { writeFile } from "node:fs/promises";
import { join } from "node:path";

interface fileManager {
  content: Array<string>;
  path: string;
  fileName: string;
}

export async function writeContentToFile({
  path,
  fileName,
  content,
}: fileManager): Promise<void> {
  try {
    const filePath = join(path, fileName);
    await writeFile(filePath, content);
  } catch (error) {
    console.log(error);
    throw new Error(`Error writing file: ${path}`);
  }
}
