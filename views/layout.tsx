import { Fragment, PropsWithChildren } from "@kitajs/html";
import { Assets } from "./fragments/assets.js";

export function BaseLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>{title || 'Hello World!'}</title>
                    <Assets entrypoint="app.ts" />
                </head>
                <body>
                    <app-header></app-header>
                    <div class="flex items-center justify-center w-full">
                        {children}
                    </div>
                </body>
            </html>
        </>
    );
}