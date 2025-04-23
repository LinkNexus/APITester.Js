import type { FastifyInstance } from "fastify";
import "reflect-metadata";
import { listModules } from "./modules.js";

interface RouteMetadata {
    path: string;
    methods?: string[];
}

export const route = ({ path, methods = ["GET"] }: RouteMetadata) => Reflect.metadata("route", { path, methods });

export async function registerRoutes(app: FastifyInstance) {
    const controllers = await listModules("./src/controllers");

    controllers.forEach((controller) => {
        const { default: Controller } = controller;
        const prefixMetaData = Reflect.getMetadata("route", Controller);
        const prefix = prefixMetaData?.path || "";

        const methods = Object.getOwnPropertyNames(Controller.prototype).filter(name => typeof Controller.prototype[name] === 'function' && name !== 'constructor');
        methods.forEach((method) => {
            if (Reflect.hasMetadata("route", Controller.prototype, method)) {
                const { path, methods: httpMethods } = Reflect.getMetadata("route", Controller.prototype, method);

                httpMethods.forEach((httpMethod) => {
                    app.route({
                        method: httpMethod,
                        url: prefix + path,
                        handler: async (request, reply) => {
                            return await Controller.prototype[method]({ request, reply });
                        }
                    });
                })
            }
        })
    })
}