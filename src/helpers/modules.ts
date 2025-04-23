import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { cwd } from "node:process";
import { fileURLToPath } from "node:url";

export async function listModules(path: string) {
    let files = await listFiles(path);
    files = files.map((file) => {
        if (file.endsWith(".ts") || file.endsWith(".tsx")) {
            file = file.replace(/\.tsx?$/, ".js");
        }

        return file;
    });

    const modules = [];

    for (const file of files) {
        const relativeFilePath = relative(join(fileURLToPath(import.meta.url), '..'), join(cwd(), file));

        if (relativeFilePath.endsWith(".ts") || relativeFilePath.endsWith(".js")) {
            if (relativeFilePath.startsWith("..")) {
                modules.push(await import(relativeFilePath));
            } else {
                modules.push(await import(`./${relativeFilePath}`));
            }
        }
    }

    return modules;
}

async function listFiles(path: string) {
    const res = await readdir(path, {
        withFileTypes: true
    });

    const files = [];

    for (const file of res) {
        if (file.isDirectory()) {
            const subFiles = await listFiles(`${path}/${file.name}`);
            files.push(...subFiles);
        } else {
            files.push(`${path}/${file.name}`);
        }
    }

    return files;
}