import Fastify from 'fastify';
import FastifyStatic from "@fastify/static";
import { fastifyKitaHtml } from "@kitajs/fastify-html-plugin";
import fastifyFormbody from '@fastify/formbody';
import path from 'node:path';
import { cwd } from 'node:process';
import { registerRoutes } from './routing/routes.js';
import fastifyMultipart from "@fastify/multipart";
import FastifyCookie from '@fastify/cookie';
import { FastifySSEPlugin } from 'fastify-sse-v2';
import Request from './database/models/Request.js';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;
const app = Fastify();

// Register plugins
app.register(fastifyKitaHtml);
app.register(FastifyStatic, {
    root: path.join(cwd(), "/public"),
    prefix: '/'
});
app.register(fastifyFormbody);
app.register(fastifyMultipart);
app.register(FastifyCookie, {
    secret: process.env.COOKIE_SECRET || "your_cookie-secret",
    parseOptions: {}
})
app.register(FastifySSEPlugin);

// Register routes
registerRoutes(app).then(() => {
    app.listen({ port: port, host: "0.0.0.0" }, (err, address) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
        app.log.info(`Server listening at ${address}`);
    });
});