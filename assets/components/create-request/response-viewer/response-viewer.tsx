import { useEffect, useState } from "react";
import { ResponseContent } from "./response-content.js";
import { ResponseHeaders } from "./response-headers.js";
import { ResponsePreview } from "./response-preview.js";

export function ResponseViewer({ response }: { response: Response }) {
    const [text, setText] = useState<string>("");
    const headers = response.headers;
    const contentType = headers.get("Content-Type") || "text/plain";

    useEffect(() => {
        response.text().then((text) => {
            if (contentType.includes("json")) {
                try {
                    const json = JSON.parse(text);
                    setText(JSON.stringify(json, null, 2));
                } catch (e) {
                    setText(text);
                }
            } else {
                setText(text);
            }
        });
    }, [response]);

    return (
        <div className="w-full mt-10 flex flex-col gap-y-6">
            <h2 className="text-xl md:text-2xl text-center">
                Request Response
            </h2>

            <div data-tabs-group="request-response">
                <div data-tabs-triggers={true}>
                    <div data-tab-section="response-headers-section">Headers</div>
                    <div data-tab-section="response-content-section">Response</div>
                    <div data-tab-section="response-preview-section">Preview</div>
                </div>

                <div className="text-muted text-center mt-8 mb-5">Status Code: <strong className="font-extrabold">{response.status}</strong></div>

                <div data-tabs-container={true} className="p-5">
                    <ResponseHeaders headers={response.headers} />
                    <ResponseContent text={text} />
                    <ResponsePreview contentType={contentType} text={text} />
                </div>
            </div>
        </div>
    );
}