import { readFile } from "node:fs/promises";

export async function Assets({ entrypoint }: { entrypoint: string }) {
    const originalFile = entrypoint;
    const { NODE_ENV } = process.env;
    if (/\.tsx?$/.test(entrypoint)) {
        entrypoint = entrypoint.replace(/\.tsx?$/, ".js");
    }

    const assetsOrigin = `http://localhost:${process.env.VITE_PORT || 5333}`;

    try {
        const output = JSON.parse(await readFile("public/assets/.vite/manifest.json", "utf-8")) as Record<string, any>;
        const item = output[originalFile];

        if (!item) {
            throw new Error(`Entry point "${entrypoint}" not found in manifest.`);
        }

        return (
            <>
                {NODE_ENV === "dev" && <script src={`${assetsOrigin}/${entrypoint}`} type="module" />}
                <script src={`/assets/${item.file}`} type="module" />
                {item.css.map((cssFile: string) => (
                    <link rel="stylesheet" href={`/assets/${cssFile}`} />
                ))}
            </>
        )
    } catch (error) {
        console.error("Error reading manifest file:", error);
        return <script src={`${assetsOrigin}/${entrypoint}`} type="module" />
    }
}