import { route } from "../routes.js";
import { HttpContext } from "../../types.js";
import { HomePage } from "#views/pages/home";
import Request from "../../database/models/Request.js";
import { EventSource } from "eventsource";
import { RequestHistoryPage } from "#views/pages/requests/requests-history";
import { RequestPage } from "#views/pages/requests/request";
import Collection from "#models/Collection";
import { ImportRequestPage } from "#views/pages/requests/import-request";

interface CreateRequestBody {
    url: string;
    method: string;
    headers: Headers;
    body: string | FormData | null;
    bodyType: string;
    requestId: string;
    collection: string | undefined
}

export default class RequestsController {
    @route({ path: "/" })
    createRequest({ request, reply }: HttpContext) {
        const { collection } = request.query as { collection: string };
        const collections = Collection.findAll();

        return reply.html(
            <HomePage collection={collection} collections={collections} />
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
            const { url, method, headers, body, bodyType, requestId, collection } = JSON.parse(request.body as string) as CreateRequestBody;
            data = { url, method, headers, bodyType, requestId, collection };
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
            collection: data.collection
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
        if (request.method) req.method = request.method;
        req.url = request.url;
        req.headers = request.headers;
        if (request.body) req.body = JSON.stringify(request.body);
        req.response = request.response;
        req.requestType = request.requestType;
        req.bodyType = request.bodyType;
        if (request.id) req.id = request.id;
        if (request.collection && request.collection !== "none" && Number(request.collection)) req.collectionId = request.collection;

        return Request.saveOrCreate(req);
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
        const { url, headers, response, collection, requestId } = JSON.parse(request.body as string);
        this.saveRequestToDatabase({
            url,
            headers,
            bodyType: "no-body",
            requestType: "event-source",
            response: {
                text: response,
            },
            collection: collection,
            id: requestId,
        });
        return reply.status(201).send("SSE request saved");
    }

    @route({ path: "/requests", methods: ["GET"] })
    listRequests({ reply }: HttpContext) {
        const requests = Request.findAllGroupedByDate();

        return reply.html(
            <RequestHistoryPage groupedRequests={requests} />
        )
    }

    @route({ path: "/requests/import", methods: ["GET", "POST"] })
    importFromCurl({ request, reply }: HttpContext) {
        if (request.method === "POST") {
            const req = JSON.parse(request.body as string);

            return reply.status(201).send(this.saveRequestToDatabase({
                ...req,
                requestType: "http",
                response: null
            }));
        }

        return reply.html(
            <ImportRequestPage collections={Collection.findAll()} />
        );
    }

    @route({ path: "/requests/:id", methods: ["GET"] })
    async showRequest({ request, reply }: HttpContext) {
        const req = Request.find((request.params as { id: string }).id);
        const collections = Collection.findAll();

        if (!req) {
            return reply.status(404).send("Request not found");
        }

        return reply.html(
            <RequestPage request={req} collections={collections} />
        )
    }

    @route({ path: "/requests/:id", methods: ["DELETE"] })
    deleteRequest({ request, reply }: HttpContext) {
        const params = request.params as { id: string };
        const req = Request.find(params.id);
        if (req) {
            Request.delete(params.id);
            return reply.status(204).send("Request deleted");
        } else {
            return reply.status(404).send("Request not found");
        }
    }

    @route({ path: "/requests", methods: ["DELETE"] })
    deleteRequests({ request, reply }: HttpContext) {
        for (const id of JSON.parse(request.body as string)) {
            Request.delete(id);
        }
        return reply.status(204).send("Collections deleted");
    }

}