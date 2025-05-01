import { AbstractCustomElement } from "@/helpers/custom-elements";
import { type FormEvent, useState } from "react";
import { CreateRequestTabs } from "@/components/create-request/create-request-tabs";
import { getValuesFromEntry } from "@/helpers/dom";
import { ResponseViewer } from "@/components/create-request/response-viewer/response-viewer";

export default class CreateRequestForm extends AbstractCustomElement {
    private isFormDataRequest: boolean = false;
    private isFormURLEncodedRequest: boolean = false;
    private isAjaxFileRequest: boolean = false;
    private formData: Record<string, any> = {};
    private data: Record<string, any> = {};
    private $form: HTMLFormElement | null = null;

    Element() {
        const [res, setRes] = useState<Response | null>(null);
        const [error, setError] = useState<string | null>(null);
        const [requestType, setRequestType] = useState<"http" | "event-source">("http");

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
                    <alert-message type="error">
                        {error}
                    </alert-message>
                )}

                <form
                    onSubmit={createRequest}
                    className="max-w-full w-full flex flex-col gap-y-6 dropzone"
                >

                    <div className="w-full flex flex-col gap-[20px]">
                        <div className="w-full flex flex-col md:flex-row gap-x-3">
                            <div className="flex flex-col gap-y-2 w-full">
                                <label htmlFor="url">URL</label>
                                <input required={true} name="url" type="text" id="url" className="w-full"
                                    placeholder="https://example.com" />
                            </div>

                            {requestType === "http" && (
                                <div className="flex flex-col gap-y-2 w-full">
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
                                </div>)}
                        </div>
                    </div>

                    <CreateRequestTabs requestType={requestType} />

                    <button type="submit" className="button-primary">Submit</button>
                </form>

                {res && (
                    <ResponseViewer response={res} />
                )}

            </>
        );
    }

    async executeRequest(e: FormEvent<HTMLFormElement>) {
        this.$form = e.currentTarget;
        this.formData = Object.fromEntries((new FormData(this.$form)).entries());
        this.data.url = new URL(this.formData.url);
        this.data.method = this.formData.method;

        this.extractQueryParams();
        this.extractHeadersEntries();
        this.extractBody();

        if (this.isAjaxFileRequest || this.isFormDataRequest) {
            this.data.body.append("__api_tester__data", JSON.stringify({
                headers: this.data.headers,
                method: this.data.method,
                url: this.data.url
            }));
        }
        const body = this.data.body instanceof FormData ?
            this.data.body : JSON.stringify({
                method: this.data.method,
                url: this.data.url,
                headers: this.data.headers,
                body: this.data.body,
            });

        return await fetch("/create-request", {
            method: "POST",
            body: body,
        });
    }

    extractQueryParams() {
        const $queryParamsEntries = this.$form!.querySelectorAll("#params-section query-entry");

        $queryParamsEntries?.forEach(($entry) => {
            const queryEntryData = getValuesFromEntry($entry);
            if (queryEntryData) this.data.url.searchParams.append(queryEntryData.name, queryEntryData.value);
        });
    }

    extractBody() {
        switch (this.formData["body-type"]) {
            case "no-body":
                this.data.body = null;
                break;

            case "form-url-encoded":
                this.isFormURLEncodedRequest = true;
                if (this.formData["submission-type"] === "direct") {
                    this.submitFormFromDataEntries();
                } else {
                    const formEntries = this.extractFormDataEntries();
                    this.data.body = (new URLSearchParams(formEntries)).toString();
                }

                break;

            case "form-data":
                if (this.formData["submission-type"] === "direct") {
                    this.submitFormFromDataEntries();
                } else {
                    this.data.body = new FormData();

                    if (this.formData["files-name"]) {
                        this.isAjaxFileRequest = true;
                        this.data.body.append(this.formData["files-name"], this.formData["files"]);
                    } else {
                        this.isFormDataRequest = true;
                        const formEntries = this.extractFormDataEntries();
                        console.log(formEntries);
                        Object.entries(formEntries).forEach(([key, value]) => {
                            this.data.body.append(key, value);
                        });
                    }
                }

                break;

            default:
                const $bodyTextArea = this.$form!.querySelector("#body-section textarea");
                if ($bodyTextArea) this.data.body = ($bodyTextArea as HTMLTextAreaElement).value;
                break;
        }
    }

    extractFormDataEntries() {
        const formEntries: Record<string, any> = {};
        const $formDataEntries = this.$form!.querySelectorAll("#body-section query-entry");
        $formDataEntries?.forEach(($entry) => {
            const formEntryData = getValuesFromEntry($entry);
            if (formEntryData) formEntries[formEntryData.name] = formEntryData.value;
        })

        return formEntries;
    }

    createForm() {
        const $form = document.createElement("form");
        document.body.append($form);
        $form.method = this.data.method;
        $form.action = this.data.url.toString();

        if (this.isFormDataRequest) {
            $form.enctype = "multipart/form-data";
        }

        if (this.isFormURLEncodedRequest) {
            $form.enctype = "application/x-www-form-urlencoded";
        }

        return $form;
    }

    submitFormFromDataEntries() {
        const $formDataEntries = this.$form!.querySelectorAll("#body-section query-entry");
        const $form = this.createForm();

        $formDataEntries?.forEach(($entry) => {
            const $name = $entry.querySelector("input");
            const $value = $entry.querySelector("textarea");
            const $file = $entry.querySelector("input[type='file']") as HTMLInputElement;

            if ($name && ($value || $file)) {
                const $input = $file || $value;
                if ($input) {
                    $form.append($input);
                }
                $input.setAttribute("name", $name.value);
            }
        });

        $form.submit();
    }

    extractHeadersEntries() {
        const $headersEntries = this.$form!.querySelectorAll("#headers-section query-entry");
        this.data.headers = new Headers();

        $headersEntries?.forEach(($entry) => {
            const headerEntryData = getValuesFromEntry($entry);
            if (headerEntryData) this.data.headers.append(headerEntryData.name, headerEntryData.value);
        });
    }

}