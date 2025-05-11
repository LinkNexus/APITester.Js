import { AbstractCustomElement } from "@/helpers/custom-elements";
import hljs from "highlight.js";
import Editor from "react-simple-code-editor";
import { useState } from "react";
import { parseCurl } from "@/helpers/parse-curl";
import type Request from "#models/Request";
import Collection from "#models/Collection";

export default class ImportRequestForm extends AbstractCustomElement {
    private collections: Collection[] = JSON.parse(this.getAttribute("collections") || "[]");

    Element() {
        const [code, setCode] = useState("");

        return (
            <form action={this.importRequest} className="w-full flex flex-col gap-y-4">
                <div className="w-full flex flex-col gap-y-2 ">
                    <label htmlFor="collection">Collection</label>
                    <select name="collection" id="collection" className="w-full">
                        <option value="none">None</option>
                        {this.collections.map((collection) => (
                            <option key={collection.id} value={collection.id}>
                                {collection.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full flex flex-col gap-y-2">
                    <label htmlFor="import-request-editor">Code</label>
                    <Editor
                        id="import-request-editor"
                        name="code"
                        className="simple-editor min-h-50 field-sizing-content p-3"
                        highlight={(code) => hljs.highlight(code, { language: "curl" }).value}
                        onValueChange={setCode}
                        value={code}
                    />
                </div>

                <button className="button-primary">Import</button>
            </form>
        )
    }

    async importRequest(formData: FormData) {
        const code = formData.get("code") as string;

        const res = await fetch("/requests/import", {
            method: "POST",
            body: JSON.stringify({
                collection: formData.get("collection"),
                ...parseCurl(code)
            })
        });

        if (res.ok) {
            const data = await res.json() as Request;
            window.location.href = `/requests/${data.id}`;
        }
    }
}