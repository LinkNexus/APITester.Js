import { AbstractCustomElement } from "@/helpers/custom-elements";
import { type FormEvent, useEffect, useState } from "react";
import { CreateRequestTabs } from "@/components/create-request/create-request-tabs";
import { getValuesFromEntry } from "@/helpers/dom";
import { ResponseViewer } from "@/components/create-request/response-viewer/response-viewer";

interface FormDataType {
    requestType: string;
    url: string;
    method?: string;
    bodyType: string;
    body?: string;
    filesName?: string;
    files?: File;
}

export default class CreateRequestForm extends AbstractCustomElement {
    private $form: HTMLFormElement | null = null;
    private formData: FormDataType | null = null;
    private headers: Headers = new Headers();
    private body: string | FormData | null = null;
    private url: URL | null = null;
    private eventSource: EventSource | null = null;
    private setEventSourceData: (data: string | null) => void = () => { };

    Element() {
        const [res, setRes] = useState<Response | null>(null);
        const [error, setError] = useState<string | null>(null);
        const [requestType, setRequestType] = useState<"http" | "event-source">("http");
        const [eventSourceData, setEventSourceData] = useState<string | null>(null);

        useEffect(() => {
            this.setEventSourceData = setEventSourceData;
        }, []);

        useEffect(() => {
            if (eventSourceData) {
                this.eventSource?.close();
                fetch("/sse/save", {
                    method: "POST",
                    body: JSON.stringify({
                        url: this.url,
                        headers: this.headers,
                        response: eventSourceData,
                    }),
                })
            }
        }, [eventSourceData])

        const createRequest = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setError(null);

            try {
                setRes(await this.executeRequest(e));
            } catch (e) {
                setError((e as Error).message);
            }
        }

        return (
            <>
                {error && (
                    // @ts-ignore
                    <alert-message type="error">{error}</alert-message>
                )}

                <form
                    onSubmit={createRequest}
                    className="max-w-full w-full flex flex-col gap-y-6 dropzone"
                >
                    <div className="w-full flex flex-col gap-x-3">
                        <label htmlFor="url">Request Type</label>
                        <select
                            onChange={(e) => setRequestType(e.currentTarget.value as "http" | "event-source")}
                            value={requestType}
                            className="w-full"
                            name="requestType"
                        >
                            <option value="http">HTTP</option>
                            <option value="event-source">Event Source</option>
                        </select>
                    </div>

                    <div className="w-full flex flex-col gap-[20px]">
                        <div className="w-full flex flex-col md:flex-row gap-x-3">
                            <div className="flex flex-col gap-y-2 w-full">
                                <label htmlFor="url">URL</label>
                                <input required={true} name="url" type="text" id="url" className="w-full"
                                    placeholder="https://example.com" />
                            </div>


                            {requestType === "http" && <div className="flex flex-col gap-y-2 w-full">
                                <label htmlFor="method">Method</label>
                                <select
                                    name="method"
                                    id="method"
                                    className="w-full p-2"
                                >
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                            </div>
                            }
                        </div>
                    </div>

                    <CreateRequestTabs requestType={requestType} />

                    <button type="submit" className="button-primary">Submit</button>
                </form>

                {res && (
                    <ResponseViewer response={res} />
                )}

                {eventSourceData && (
                    <div className="w-full mt-10 flex flex-col gap-y-6">
                        <h2 className="text-xl md:text-2xl text-center">
                            Request Response
                        </h2>
                        <div className="special-container w-full min-h-30 max-h-64 overflow-auto">
                            {eventSourceData}
                        </div>
                    </div>
                )}

            </>
        );
    }

    async executeRequest(e: FormEvent<HTMLFormElement>) {
        this.$form = e.currentTarget as HTMLFormElement;
        // @ts-ignore
        this.formData = Object.fromEntries(new FormData(this.$form)) as FormDataType;

        this.appendQueryParams();
        this.appendHeaders();

        if (this.formData?.requestType === "http") {
            this.extractBody();

            console.log("Fuck");

            if (this.formData?.bodyType === "form-data") {
                (this.body as FormData).append("__api_tester__data", JSON.stringify({
                    headers: this.headers,
                    method: this.formData.method,
                    url: this.url,
                    bodyType: this.formData.bodyType,
                }));
            }

            const body = this.body instanceof FormData ?
                this.body : JSON.stringify({
                    method: this.formData.method,
                    url: this.url,
                    headers: this.headers,
                    body: this.body,
                    bodyType: this.formData.bodyType,
                });

            return await fetch("/http-request/create", {
                method: "POST",
                body: body,
            });
        }

        fetch("/sse/create", {
            method: "POST",
            body: JSON.stringify({
                url: this.formData?.url,
                headers: this.headers,
                requestType: this.formData?.requestType,
            }),
        }).then(() => {
            this.eventSource = new EventSource(this.url!);
            this.eventSource.onmessage = (e) => {
                this.setEventSourceData(e.data);
            }
        })

        return null;
    }

    appendQueryParams() {
        this.url = new URL(this.formData!.url);
        const $queryParamsEntries = this.$form!.querySelectorAll("#params-section query-entry");
        $queryParamsEntries.forEach(($entry) => {
            const entry = getValuesFromEntry($entry);

            if (entry) this.url?.searchParams.append(entry.name, entry.value);
        })
    }

    appendHeaders() {
        const $headerEntries = this.$form!.querySelectorAll("#headers-section query-entry");
        $headerEntries.forEach(($entry) => {
            const entry = getValuesFromEntry($entry);

            if (entry) this.headers.append(entry.name, entry.value);
        })
    }

    extractBody() {
        switch (this.formData!.bodyType) {
            case "no-body":
                this.body = null;
                break;

            case "form-url-encoded":
                this.body = new URLSearchParams(this.extractFormData()).toString();
                this.headers.append("Content-Type", "application/x-www-form-urlencoded");
                break;

            case "form-data":
                this.body = new FormData();

                if (this.formData?.filesName) {
                    this.body.append(this.formData.filesName, this.formData.files!)
                } else {
                    const formEntries = this.extractFormData();
                    Object.entries(formEntries).forEach(([key, value]) => {
                        (this.body as FormData).append(key, value);
                    });
                }
                break;

            default:
                this.body = this.formData!.body as string;
                break;

        }
    }

    extractFormData() {
        const formEntries: Record<string, any> = {};
        const $formDataEntries = this.$form!.querySelectorAll("#body-section query-entry");
        $formDataEntries?.forEach(($entry) => {
            const formEntryData = getValuesFromEntry($entry);
            if (formEntryData) formEntries[formEntryData.name] = formEntryData.value;
        })

        return formEntries;
    }

}