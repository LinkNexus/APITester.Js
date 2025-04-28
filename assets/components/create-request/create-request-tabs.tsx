import { QueryParameterSection } from "@/components/create-request/query-parameter-section";
import { BodySection } from "@/components/create-request/body-section";
import { HeadersSection } from "@/components/create-request/headers-section";


export function CreateRequestTabs() {
    return (
        <div data-tabs-group="create-request">
            <div data-tabs-triggers={true}>
                <div data-tab-section="params-section">Params</div>
                <div data-tab-section="body-section">Body</div>
                <div data-tab-section="headers-section">Header</div>
            </div>

            <div data-tabs-container={true}>
                <QueryParameterSection />
                <BodySection />
                <HeadersSection />
            </div>
        </div>
    )
}