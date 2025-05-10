import { ChangeEvent, useEffect, useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js";
import { AddQueryButton } from "@/components/create-request/add-query-button";
import type Request from "#models/Request";

export function BodySection({ request }: { request: Request | null }) {
    const [selection, setSelection] = useState(request?.bodyType || "no-body");
    const [code, setCode] = useState("");
    const [isFile, setIsFile] = useState(false);
    const [queriesNumber, setQueriesNumber] = useState(1);
    const formDataRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (request && ["json", "html", "xml", "text"].includes(request.bodyType)) {
            setCode(request.body!.replace(/^"|"$/g, '')
                .replace(/\\n/g, '\n')
                .replace(/\\"/g, '"'));
        }

        if (request && request.bodyType === "form-data") {
            for (const [key, value] of Object.entries(JSON.parse(request.body!))) {
                addQueryEntry(key, value as string);
            }
        }

        if (request && request.bodyType === "form-url-encoded") {
            for (const [key, value] of Array.from(new URLSearchParams(request.body!.replace(/^"|"$/g, '')))) {
                addQueryEntry(key, value);
            }
        }
    }, [selection]);

    useEffect(() => {
        if (selection === "form-data" && !request) setIsFile(window.prompt("Is this a file? (yes/no)")?.toLowerCase() === "yes");
    }, [selection]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelection(e.target.value);
    }

    const addQueryEntry = (key?: string, value?: string) => {
        setQueriesNumber(prev => prev + 1);
        const queryEntry = document.createElement("query-entry");
        queryEntry.setAttribute("title", `Form Entry No ${queriesNumber}`);
        formDataRef.current?.append(queryEntry);
        queryEntry.setAttribute("key-val", key || "");
        queryEntry.setAttribute("value", value || "");
    }

    return (
        <div id="body-section" className="p-5 flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2 max-w-full w-full">
                <label htmlFor="body-type">Body-Type</label>
                <select value={selection} onChange={handleChange} name="bodyType" id="body-type"
                    className="w-full p-2">
                    <option value="no-body">No Body</option>
                    <option value="form-url-encoded">Form URL Encoded</option>
                    <option value="form-data">Form Data</option>
                    <option value="json">JSON</option>
                    <option value="html">HTML</option>
                    <option value="xml">XML</option>
                    <option value="text">Plain Text</option>
                </select>
            </div>

            {(selection === "json" || selection === "html" || selection === "xml") && (
                <Editor
                    name="body"
                    className="simple-editor min-h-50 field-sizing-content"
                    highlight={(code) => hljs.highlight(code, { language: selection }).value}
                    onValueChange={setCode}
                    value={code}
                />
            )}

            {selection === "text" && (
                <Editor
                    name="body"
                    className="simple-editor min-h-50 field-sizing-content"
                    highlight={code => code}
                    onValueChange={setCode}
                    value={code}
                />
            )}

            {selection === "form-data" && (
                <>
                    <div id="form-data-container" ref={formDataRef} className="flex flex-col gap-y-4 mb-2"></div>
                    {isFile ? (
                        // @ts-ignore
                        <query-entry is-file="true" title="Form Data File"></query-entry>
                    ) : (
                        <button onClick={() => addQueryEntry()} type="button" className="w-fit button-secondary gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span>
                                Add Form Entry
                            </span>
                        </button>
                    )}
                </>
            )}

            {selection === "form-url-encoded" && (
                <>
                    <div id="form-data-container" ref={formDataRef} className="flex flex-col gap-y-4 mb-2"></div>
                    <AddQueryButton index={queriesNumber - 1} containerRef={formDataRef} queryTitle={"Form Entry No"}>
                        Add Form Entry
                    </AddQueryButton>
                </>
            )}
        </div>
    )
}