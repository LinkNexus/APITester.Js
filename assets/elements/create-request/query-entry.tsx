import { AbstractCustomElement } from "@/helpers/custom-elements";
import { ReactNode, useId } from "react";
import { FileUploader } from "react-drag-drop-files";

export default class QueryEntry extends AbstractCustomElement {
    Element({ title, isFile }: { id: number, title: string, isFile: string }): ReactNode {
        const fileTypes = ["JPG", "PNG", "GIF"];
        const id = useId();

        return (
            <>
                <div className="w-full">
                    <span className="font-semibold">{title}</span>
                    <div className="w-full mt-3 flex flex-col md:flex-row gap-x-3 gap-y-4">
                        <input name={isFile ? "filesName" : id} defaultValue="hello" placeholder="name" type="text" className="w-full h-10" />
                        {isFile === "true" ? (
                            <FileUploader
                                name="files"
                                types={fileTypes}
                            />
                        ) : (
                            <textarea defaultValue="world" placeholder="value"
                                className="w-full min-h-10 field-sizing-content" />
                        )}
                    </div>
                </div>
                <hr />
            </>
        );
    }

}