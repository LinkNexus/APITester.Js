import type { FastifyReply, FastifyRequest } from "fastify";

export interface HttpContext {
    request: FastifyRequest;
    reply: FastifyReply;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["app-header"]: HtmlTag;
            ["create-request-form"]: HtmlTag;
        }
    }
}