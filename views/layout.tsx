import { PropsWithChildren } from "@kitajs/html";
import { Assets } from "./fragments/assets.js";

export function BaseLayout({ children, title, description }: PropsWithChildren<{ title?: string, description?: string }>) {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content={description || 'ApiTester.Js - A simple API testing tool made in NodeJS'} />
                    <title>{`ApiTester.Js ${title ? ` | ${title}` : ""}`}</title>
                    <Assets entrypoint="app.ts" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                    <link rel="manifest" href="/favicon/site.webmanifest" />
                </head>
                <body>
                    <app-header></app-header>
                    <div class="w-full">
                        {children}
                    </div>
                </body>
            </html>
        </>
    );
}