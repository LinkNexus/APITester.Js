import type { FastifyReply, FastifyRequest } from "fastify";

export interface HttpContext {
    request: FastifyRequest;
    reply: FastifyReply;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["app-header"]: HtmlTag;
            ["create-request-form"]: HtmlTag & { request?: string, collection?: string, collections: string };
            ["grouped-requests"]: HtmlTag & { requests: string };
            ["create-collection-button"]: HtmlTag;
            ["create-collection-form"]: HtmlTag;
            ["collections-list"]: HtmlTag & { collections?: string }
            ["entities-delete-button"]: HtmlTag;
        }
    }
}