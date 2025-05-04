import { route } from "../routing/routes.js";
import { HttpContext } from "../types.js";
import { HomePage } from "#views/pages/home";
import Request from "../database/models/Request.js";
import { EventSource } from "eventsource";
import { RequestHistoryPage } from "#views/pages/requests-history";
import { RequestPage } from "#views/pages/request";

interface CreateRequestBody {
    url: string;
    method: string;
    headers: Headers;
    body: string | FormData | null;
    bodyType: string;
    requestId: string;
}

export default class RequestController {
    @route({ path: "/" })
    createRequest({ reply }: HttpContext) {
        return reply.html(
            <HomePage />
        );
    }

    @route({ path: "/http-request/create", methods: ["POST"] })
    async createHttpRequest({ request, reply }: HttpContext) {
        let data = {} as Omit<CreateRequestBody, "body">;
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
            const { url, method, headers, body, bodyType, requestId } = JSON.parse(request.body as string) as CreateRequestBody;
            data = { url, method, headers, bodyType, requestId };
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
            id: data.requestId,
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
        if (request.id) {
            req.id = request.id;
        }

        Request.saveOrCreate(req);
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
            response: {
                text: response,
            },
        });
        return reply.status(201).send("SSE request saved");
    }

    @route({ path: "/requests", methods: ["GET"] })
    requestsList({ reply }: HttpContext) {
        const requests = Request.findAllGroupedByDate();

        console.log(Request.findAllGroupedByDate());

        return reply.html(
            <RequestHistoryPage groupedRequests={requests} />
        )
    }

    @route({ path: "/requests/:id", methods: ["GET"] })
    async getRequest({ request, reply }: HttpContext) {
        const req = Request.find((request.params as { id: string }).id);

        if (!req) {
            return reply.status(404).send("Request not found");
        }

        return reply.html(
            <RequestPage request={req} />
        )
    }

}