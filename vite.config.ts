import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const { PORT, VITE_PORT } = process.env;

export default defineConfig({
    root: "./assets/",
    plugins: [
        react(),
        tailwindcss()
    ],
    server: {
        port: VITE_PORT ? parseInt(VITE_PORT, 10) : 5333,
        origin: `http://localhost:${PORT || 3333}`,
    },
    build: {
        outDir: "../public",
        emptyOutDir: true,
        rollupOptions: {
            input: "./assets/app.ts", // Specify your entry point
        },
        assetsDir: ".",
        manifest: true,
    }
})