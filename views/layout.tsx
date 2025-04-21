import { createElement, Fragment, PropsWithChildren } from "@kitajs/html";
import { readManifest } from "../src/helpers/manifest-reader.js";

export function BaseLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
    return (
        <>
            {'<!doctype html>'}
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>{title || 'Hello World!'}</title>
                    <Assets />
                </head>
                <body>
                    {children}
                </body>
            </html>
        </>
    );
}

async function Assets() {
    const env = process.env.NODE_ENV || 'development';

    if (env === 'development') {
        const assetsOrigin = `http://localhost:${process.env.VITE_PORT || 5333}`;
        return (
            createElement(Fragment, {}, [
                <link rel="stylesheet" href={`${assetsOrigin}/styles/app.css`} />,
                <script src={`${assetsOrigin}/app.js`} type="module"></script>
            ])
        );
    }

    const manifestOutput = await readManifest("public/.vite/manifest.json");
    const entrypoints = manifestOutput.map((item) => {
        return createElement(Fragment, {}, [
            <script src={item.file} type="module"></script>,
            ...item.css.map((css) => (
                <link rel="stylesheet" href={css} />
            ))
        ]);
    })
    return createElement(Fragment, {}, entrypoints);
}