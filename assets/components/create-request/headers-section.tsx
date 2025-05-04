import { useRef } from "react";
import { AddQueryButton } from "@/components/create-request/add-query-button";
import type Request from "#models/Request";

export function HeadersSection({ request }: { request: Request | null }) {
    const headersEntriesRef = useRef<HTMLDivElement | null>(null);
    const queriesNumber = request ? Object.entries(request?.headers).length : 0;

    return (
        <div id="headers-section" className="p-5">
            <div ref={headersEntriesRef} className="flex flex-col gap-y-4 mb-4">
                {request?.headers && Object.entries(request?.headers).map(([key, value], index) => (
                    // @ts-ignore
                    <query-entry title={`Header No ${index + 1}`} key={`header-${key}`} key-val={key} value={value}></query-entry>
                ))}
            </div>

            <AddQueryButton index={queriesNumber} queryTitle="Header No" containerRef={headersEntriesRef}>
                Add Header
            </AddQueryButton>
        </div>
    );
}