import {AbstractCustomElement} from "@/helpers/custom-elements";
import {ReactNode} from "react";

export default class QueryEntry extends AbstractCustomElement {
    Element({ id, title }: { id: number, title: string }): ReactNode {
        return (
            <>
                <div className="w-full">
                    <span className="font-semibold">{title} {id}</span>
                    <div className="w-full mt-3 flex flex-col md:flex-row gap-x-3 gap-y-4">
                        <input defaultValue="hello" placeholder="name" type="text" className="w-full h-10" />
                        <textarea defaultValue="world" placeholder="value" className="w-full min-h-10 field-sizing-content" />
                    </div>
                </div>
                <hr />
            </>
        );
    }

}