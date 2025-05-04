import { readManifestClient } from "#helpers/read-manifest-client";

export async function Assets({ entrypoint }: { entrypoint: string }) {
    const originalFile = entrypoint;

    if (/\.tsx?$/.test(entrypoint)) {
        entrypoint = entrypoint.replace(/\.tsx?$/, ".js");
    }

    const assetsOrigin = `http://localhost:${process.env.VITE_PORT || 5333}`;
    const devScript = <script src={`${assetsOrigin}/${entrypoint}`} type="module" />;

    try {
        const output = await readManifestClient("public/assets/.vite/manifest.json");
        const item = output[originalFile];

        return (
            <>
                {devScript}
                <script src={`/assets/${item.file}`} type="module" />
                {item.css.map((css) => (
                    <link rel="stylesheet" href={`/assets/${css}`} />
                ))}
            </>
        )
    } catch (e) {
        console.error("Error reading manifest file:", e);
        return devScript;
    }
}