import Fastify from 'fastify';
import FastifyStatic from "@fastify/static";
import { fastifyKitaHtml } from "@kitajs/fastify-html-plugin";
import fastifyFormbody from '@fastify/formbody';
import path from 'node:path';
import { cwd } from 'node:process';
import { registerRoutes } from '#helpers/route';
import fastifyMultipart from "@fastify/multipart";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;
const app = Fastify();

// Register plugins
app.register(fastifyKitaHtml);
app.register(FastifyStatic, {
    root: path.join(cwd(), "/public"),
    prefix: '/'
});
app.register(fastifyFormbody);
app.register(fastifyMultipart, {
    // attachFieldsToBody: true,
});


// Register routes
registerRoutes(app).then(() => {
    app.listen({ port: port }, (err, address) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
        app.log.info(`Server listening at ${address}`);
    });
});