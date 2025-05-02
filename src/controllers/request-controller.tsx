import { route } from "../routing/routes.js";
import { HttpContext } from "../types.js";
import { CreateHTTPRequestPage } from "#views/pages/create-http-request";
import Request from "../database/models/Request.js";
import { EventSource } from "eventsource";
import { METHODS } from "http";

interface CreateRequestBody {
    url: string;
    method: string;
    headers: Headers;
    body: string | FormData | null;
    bodyType: string;
}

export default class RequestController {
    // @route({ path: "/", methods: ["GET", "POST"] })
    // async test({ request, reply }: HttpContext) {
    //     if (request.method === "POST") {
    //         let reqBody = null;
    //         let data = {} as { url: string | URL; method: string; headers: Headers | Record<string, string>, bodyType: string };
    //         let isFileRequest = false;

    //         if (request.isMultipart()) {
    //             let requestData = {};
    //             let file = null;
    //             reqBody = new FormData();

    //             for await (const part of request.parts()) {
    //                 if (part.fieldname === "__api_tester__data") {
    //                     // @ts-ignore
    //                     data = JSON.parse(part.value);

    //                 } else {
    //                     if (part.type === "file") {
    //                         file = part;
    //                     } else {
    //                         requestData[part.fieldname] = part.value;
    //                     }
    //                 }
    //             }

    //             if (file) {
    //                 const chunks = [];
    //                 for await (const chunk of file.file) {
    //                     chunks.push(chunk);
    //                 }
    //                 const buffer = Buffer.concat(chunks);

    //                 reqBody.append(file.fieldname, new Blob([buffer], { type: file.mimetype }), file.filename);
    //                 isFileRequest = true;
    //             } else {
    //                 Object.entries(requestData).forEach(([key, value]) => {
    //                     reqBody.append(key, value);
    //                 });
    //             }
    //         } else {
    //             const { url, method, headers, body, bodyType } = JSON.parse(request.body as string) as CreateRequestBody;
    //             data = { url, method, headers, bodyType };
    //             reqBody = body;
    //         }

    //         const res = await fetch(data.url, {
    //             method: data.method,
    //             headers: data.headers,
    //             body: reqBody,
    //             "credentials": "include",
    //         });

    //         for (const [key, value] of res.headers.entries()) {
    //             if ([
    //                 'transfer-encoding',
    //                 'content-encoding',
    //                 'content-length',
    //                 'connection',
    //                 'keep-alive',
    //                 'date',
    //                 'server'
    //             ].includes(key.toLowerCase())) continue;

    //             reply.header(key, value);
    //         }

    //         const resText = await res.text();
    //         const resHeaders = Object.fromEntries(res.headers.entries());

    //         const req = new Request();
    //         req.bodyType = data.bodyType;
    //         req.method = data.method;
    //         req.url = data.url.toString();
    //         req.headers = data.headers;
    //         if (!isFileRequest) req.body = reqBody instanceof FormData ? Object.fromEntries(reqBody.entries()) : reqBody;
    //         req.response = res;
    //         req.response = {
    //             text: resText,
    //             headers: resHeaders,
    //             status: res.status
    //         }
    //         Request.save(req);

    //         return reply.status(res.status).send(resText);
    //     }

    //     return reply.html(
    //         <CreateHTTPRequestPage />
    //     );
    // }

    @route({ path: "/" })
    createRequest({ reply }: HttpContext) {
        return reply.html(
            <CreateHTTPRequestPage />
        );
    }

    @route({ path: "/http-request/create", methods: ["POST"] })
    async createHttpRequest({ request, reply }: HttpContext) {
        let data = {} as { url: string | URL; method: string; headers: Headers | Record<string, string>, bodyType: string };
        let requestBody = null;

        if (request.isMultipart()) {
            requestBody = new FormData();

            for await (const part of request.parts()) {
                if (part.fieldname === "__api_tester__data") {
                    // @ts-ignore
                    data = JSON.parse(part.value);
                } else if (part.type === "file") {
                    const blob = await this.convertFileToBlob(part.file);
                    requestBody.append(part.fieldname, blob, part.filename);
                } else {
                    requestBody.append(part.fieldname, part.value as string);
                }
            }
        } else {
            const { url, method, headers, body, bodyType } = JSON.parse(request.body as string) as CreateRequestBody;
            data = { url, method, headers, bodyType };
            requestBody = body;
        }

        const res = await fetch(data.url, {
            method: data.method,
            headers: data.headers,
            body: requestBody,
            "credentials": "include",
        });

        const resText = await res.text();
        const resHeaders = Object.fromEntries(res.headers.entries());

        for (const [key, value] of res.headers.entries()) {
            if ([
                'transfer-encoding',
                'content-encoding',
                'content-length',
                'connection',
                'keep-alive',
                'date',
                'server'
            ].includes(key.toLowerCase())) continue;

            reply.header(key, value);
        }

        this.saveRequestToDatabase({
            url: data.url.toString(),
            method: data.method,
            headers: data.headers,
            body: data.bodyType === "form-data" ? Object.fromEntries(requestBody.entries()) : requestBody,
            bodyType: data.bodyType,
            response: {
                text: resText,
                headers: resHeaders,
                status: res.status
            },
            requestType: "http",
        })

        return reply.status(res.status).send(resText);
    }

    async convertFileToBlob(file: any) {
        const chunks = [];
        for await (const chunk of file.file) {
            chunks.push(chunk);
        }
        return new Blob([Buffer.concat(chunks)]);
    }

    saveRequestToDatabase(request: any) {
        const req = new Request();
        req.bodyType = request.bodyType;
        req.method = request.method;
        req.url = request.url;
        req.headers = request.headers;
        req.body = JSON.stringify(request.body);
        req.response = request.response;
        req.requestType = request.requestType;
        req.bodyType = request.bodyType;
        Request.save(req);
    }

    @route({ path: "/sse/create", methods: ["POST"] })
    createSSERequest({ request, reply }: HttpContext) {
        reply.setCookie("sse-data", JSON.stringify(request.body), {
            secure: true,
            httpOnly: true,
            sameSite: "strict",
        });
        reply.send("SSE request created");
    }

    @route({ path: "/sse/listen", methods: ["GET"] })
    listenSSERequest({ request, reply }: HttpContext) {
        const data = JSON.parse(request.cookies["sse-data"]);
        const { url, headers } = JSON.parse(data);
        const eventSource = new EventSource(url, {
            fetch: (input, init) =>
                fetch(input, {
                    ...init,
                    headers: {
                        ...init?.headers,
                        ...headers,
                    },
                }),
        });

        eventSource.onmessage = (event) => {
            const message = event.data;
            reply.sse({
                id: event.lastEventId,
                data: message,
            });
            eventSource.close();
        }
    }

    @route({ path: "/sse/save", methods: ["POST"] })
    saveSSE({ request, reply }: HttpContext) {
        const { url, headers, response } = JSON.parse(request.body as string);
        this.saveRequestToDatabase({
            url,
            headers,
            bodyType: "no-body",
            requestType: "event-source",
            response,
        });
        return reply.status(201).send("SSE request saved");
    }

}