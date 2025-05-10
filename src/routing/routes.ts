import type { FastifyInstance } from "fastify";
import "reflect-metadata";
import { listModules } from "#helpers/modules";

interface RouteMetadata {
    path: string;
    methods?: string[];
}

export const route = ({ path, methods = ["GET"] }: RouteMetadata) => Reflect.metadata("routes", { path, methods });

export async function registerRoutes(app: FastifyInstance) {
    const controllers = await listModules("./src/routing/controllers");

    controllers.forEach((controller) => {
        const { default: Controller } = controller;
        const globalMetaData = Reflect.getMetadata("routes", Controller);
        const prefix = globalMetaData?.path || "";
        const globalMethods = globalMetaData?.methods || [];

        const methods = Object.getOwnPropertyNames(Controller.prototype).filter(name => typeof Controller.prototype[name] === 'function' && name !== 'constructor');
        methods.forEach((method) => {
            if (Reflect.hasMetadata("routes", Controller.prototype, method)) {
                const { path, methods: httpMethods }: RouteMetadata = Reflect.getMetadata("routes", Controller.prototype, method);
                const httpMethodsSet = new Set([...globalMethods, ...httpMethods]);

                httpMethodsSet.forEach((httpMethod) => {
                    app.route({
                        method: httpMethod,
                        url: prefix + path,
                        handler: async function (request, reply) {
                            return await Controller.prototype[method]({ request, reply });
                        }
                    });

                    app.route({
                        method: httpMethod,
                        url: prefix + path + "/",
                        handler: async function (request, reply) {
                            return await Controller.prototype[method]({ request, reply });
                        }
                    })
                });
            }
        });
    });
}