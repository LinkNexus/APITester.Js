import {useRef} from "react";
import {AddQueryButton} from "@/components/create-request/add-query-button";

export function HeadersSection() {
    const headersEntriesRef = useRef<HTMLDivElement|null>(null);

    return (
        <div id="headers-section" className="p-5">
            <div ref={headersEntriesRef} className="flex flex-col gap-y-4 mb-4">
            </div>

            <AddQueryButton queryTitle="Header No" containerRef={headersEntriesRef}>
                Add Header
            </AddQueryButton>
        </div>
    );
}