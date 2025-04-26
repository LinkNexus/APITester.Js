import {AbstractCustomElement} from "@/helpers/custom-elements";
import {ReactNode, useRef} from "react";
import {CreateRequestTabs} from "@/components/create-request/create-request-tabs";
import {getValuesFromEntry} from "@/helpers/utils";

export default class CreateRequestForm extends AbstractCustomElement {
    Element(): ReactNode {
        const formRef = useRef<HTMLFormElement|null>(null);

        function createRequest(formData: FormData) {
            const url = new URL(formData.get("url")!.toString());
            const data: Record<string, any> = Object.fromEntries(formData.entries());

            console.log(url);

            const $queryParamsEntries = formRef.current?.querySelectorAll("#params-section query-entry");
            $queryParamsEntries?.forEach(($entry) => {
                console.log(getValuesFromEntry($entry));
            });
        }

        return (
            <form ref={formRef} action={createRequest} className="max-w-full w-full flex flex-col gap-y-6 dropzone">
                <div className="w-full flex-wrap flex gap-[20px]">
                    <div className="flex flex-col gap-y-2 w-full lg:w-[calc(50%-10px)]">
                        <label htmlFor="url">URL</label>
                        <input defaultValue="https://example.com" name="url" type="url" id="url" className="w-full" placeholder="https://example.com" />
                    </div>

                    <div className="flex flex-col gap-y-2 w-full lg:w-[calc(50%-10px)]">
                        <label htmlFor="method">Method</label>
                        <select name="method" id="method" className="w-full p-2">
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>
                </div>

                <CreateRequestTabs />

                <button className="button-primary">Submit</button>
            </form>
        );
    }

}