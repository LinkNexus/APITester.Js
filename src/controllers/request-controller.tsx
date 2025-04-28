import { route } from "#helpers/route";
import { HttpContext } from "../types.js";
import { CreateRequestPage } from "#views/pages/create-request";

interface CreateRequestBody {
    url: string;
    method: string;
    headers: Headers;
    body: string | FormData | null;
    isFormDataRequest: boolean;
}

export default class RequestController {

    @route({ path: "/create-request", methods: ["GET", "POST"] })
    async index({ request, reply }: HttpContext) {
        if (request.method === "POST") {
            let reqBody = null;
            let data = {} as { url: string | URL; method: string; headers: Headers | Record<string, string> };

            if (request.isMultipart()) {

                let requestData = {};
                let file = null;

                reqBody = new FormData();

                for await (const part of request.parts()) {
                    console.log(part);
                    if (part.fieldname === "__api_tester__data") {
                        // @ts-ignore
                        data = JSON.parse(part.value);

                    } else {
                        if (part.type === "file") {
                            file = part;
                        } else {
                            requestData[part.fieldname] = part.value;
                        }
                    }
                }

                if (file) {
                    const chunks = [];
                    for await (const chunk of file.file) {
                        chunks.push(chunk);
                    }
                    const buffer = Buffer.concat(chunks);

                    reqBody.append(file.fieldname, new Blob([buffer], { type: file.mimetype }), file.filename);
                } else {
                    Object.entries(requestData).forEach(([key, value]) => {
                        reqBody.append(key, value);
                    });
                }
            } else {
                const { url, method, headers, body } = JSON.parse(request.body as string) as CreateRequestBody;
                data = { url, method, headers };
                reqBody = body;
            }

            const res = await fetch(data.url, {
                method: data.method,
                headers: data.headers,
                body: reqBody
            });

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
            reply.status(res.status);
            return reply.send(await res.text());
        }

        return reply.html(
            <CreateRequestPage />
        );
    }

}