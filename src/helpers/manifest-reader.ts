import { readFile } from "fs/promises";

export async function readManifest(manifestPath: string): Promise<{ file: string, css: string[] }[]> {
    const content = await readFile(manifestPath);
    const json = JSON.parse(content.toString());
    return Object.values(json);
}