import {QueryParameterSection} from "@/components/create-request/query-parameter-section";
import {BodySection} from "@/components/create-request/body-section";
import {HeadersSection} from "@/components/create-request/headers-section";


export function CreateRequestTabs() {
    return (
        <div data-tabs-group="create-request" className="flex flex-col w-full">
            <div data-tabs-triggers={true} className="flex w-full">
                <div data-tab-section="params-section"
                     className="w-full text-center bg-accent-2 p-2 rounded-s-xl cursor-pointer border-secondary border clickable">Params
                </div>
                <div data-tab-section="body-section"
                     className="w-full text-center bg-accent-2 p-2 cursor-pointer border-secondary border clickable">Body
                </div>
                <div data-tab-section="headers-section"
                     className="w-full text-center bg-accent-2 p-2 rounded-e-xl cursor-pointer border-secondary border clickable">Header
                </div>
            </div>

            <div data-tabs-container={true}>
                <QueryParameterSection/>
                <BodySection/>
                <HeadersSection/>
            </div>
        </div>
    )
}