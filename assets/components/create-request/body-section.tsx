import { ChangeEvent, useEffect, useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js";
import { AddQueryButton } from "@/components/create-request/add-query-button";

export function BodySection() {
    const [selection, setSelection] = useState("no-body");
    const [code, setCode] = useState("");
    const [isAjax, setIsAjax] = useState(false);
    const [isFile, setIsFile] = useState(false);
    const formDataRef = useRef<HTMLDivElement>(null);
    let queriesNumber = 0;

    useEffect(() => {
        if (isAjax) {
            setIsFile(window.prompt("Is this a file? (yes/no)")?.toLowerCase() === "yes");
        } else {
            setIsFile(false);
        }
    }, [isAjax]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelection(e.target.value);
    }

    const addQueryEntry = () => {
        queriesNumber++;
        const queryEntry = document.createElement("query-entry");
        queryEntry.setAttribute("title", `Form Entry No ${queriesNumber}`);
        formDataRef.current?.append(queryEntry);
    }

    return (
        <div id="body-section" className="p-5 flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2 max-w-full w-full">
                <label htmlFor="body-type">Body-Type</label>
                <select value={selection} onChange={handleChange} name="body-type" id="body-type"
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
                    className="simple-editor min-h-50 field-sizing-content"
                    highlight={(code) => hljs.highlight(code, { language: selection }).value}
                    onValueChange={setCode}
                    value={code}
                />
            )}

            {selection === "text" && (
                <Editor
                    className="simple-editor min-h-50 field-sizing-content"
                    highlight={code => code}
                    onValueChange={setCode}
                    value={code}
                />
            )}

            {selection === "form-data" && (
                <>
                    <SubmissionTypeSelector onChange={(e) => setIsAjax(e.target.value === "ajax")} />
                    <div id="form-data-container" ref={formDataRef} className="flex flex-col gap-y-4 mb-2"></div>
                    {isFile ? (
                        <query-entry is-file="true" title="Form Data File"></query-entry>
                    ) : (
                        <button onClick={addQueryEntry} type="button" className="w-fit button-secondary gap-x-2">
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
                    <SubmissionTypeSelector />
                    <div id="form-data-container" ref={formDataRef} className="flex flex-col gap-y-4 mb-2"></div>
                    <AddQueryButton containerRef={formDataRef} queryTitle={"Form Entry No"}>
                        Add Form Entry
                    </AddQueryButton>
                </>
            )}
        </div>
    )
}

function SubmissionTypeSelector({ onChange }: { onChange?: (e: ChangeEvent<HTMLSelectElement>) => void }) {
    return (
        <select onChange={onChange} name="submission-type" className="mb-4">
            <option value="direct">Direct Form Submission</option>
            <option value="ajax">AJAX</option>
        </select>
    );
}