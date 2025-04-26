import {ChangeEvent, useEffect, useRef, useState} from "react";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js";
import {AddQueryButton} from "@/components/create-request/add-query-button";
import {FileUploader} from "react-drag-drop-files";

export function BodySection() {
    const [selection, setSelection] = useState("no-body");
    const [code, setCode] = useState("");
    const formDataRef = useRef<HTMLDivElement>(null);

    const fileTypes = ["JPG", "PNG", "GIF"];

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelection(e.target.value);
    }

    return (
        <div id="body-section" className="p-5 flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2 max-w-full w-full">
                <label htmlFor="body-type">Body-Type</label>
                <select value={selection} onChange={handleChange} name="body-type" id="body-type" className="w-full p-2">
                    <option value="no-body">No Body</option>
                    <option value="form-data">Form Data</option>
                    <option value="json">JSON</option>
                    <option value="html">HTML</option>
                    <option value="xml">XML</option>
                    <option value="file">File</option>
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
                    <div id="form-data-container" ref={formDataRef} className="flex flex-col gap-y-4 mb-4"></div>
                    <AddQueryButton className="w-fit" queryTitle="Form Entry No" containerRef={formDataRef}>
                        Add Form Data Query
                    </AddQueryButton>
                </>
            )}

            {selection === "file" && (
                <FileUploader
                    name="file"
                    types={fileTypes}
                />
            )}
        </div>
    )
}