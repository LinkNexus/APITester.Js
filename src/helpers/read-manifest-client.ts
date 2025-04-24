import { readFile } from "node:fs/promises";

export async function readManifestClient(manifestPath: string): Promise<Record<string, { file: string, css: string[] }>> {
    const content = await readFile(manifestPath);
    return JSON.parse(content.toString());
}