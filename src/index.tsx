import Fastify from 'fastify';
import FastifyStatic from "@fastify/static";
import { fastifyKitaHtml } from "@kitajs/fastify-html-plugin"
import { HomePage } from '#views/pages/home';
import path from 'node:path';
import { cwd } from 'node:process';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = Fastify({ logger: true });
app.register(fastifyKitaHtml);
app.register(FastifyStatic, {
    root: path.join(cwd(), "/public"),
    prefix: '/'
});

app.get("/", async (request, reply) => {
    return reply.html(<HomePage />);
});

app.listen({ port: port }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
});