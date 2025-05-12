import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cwd } from "node:process";
import path from "node:path";

const { PORT, VITE_PORT } = process.env;

export default defineConfig({
    root: "./assets/",
    plugins: [
        react({
            babel: {
                plugins: [
                    ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
                ]
            }
        }),
        tailwindcss()
    ],
    server: {
        port: VITE_PORT ? parseInt(VITE_PORT, 10) : 5333,
        origin: `http://localhost:${PORT || 3333}`,
    },
    build: {
        outDir: "../public/assets",
        emptyOutDir: true,
        rollupOptions: {
            input: "./assets/app.ts", // Specify your entry point
        },
        assetsDir: ".",
        manifest: true,
        target: "esnext",
    },
    resolve: {
        alias: {
            "@": path.resolve(cwd(), "assets/"),
        }
    }
})