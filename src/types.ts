import { FastifyReply, FastifyRequest } from "fastify";

export interface HttpContext {
    request: FastifyRequest;
    reply: FastifyReply;
}