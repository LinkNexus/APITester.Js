import { useRef } from "react";
import { AddQueryButton } from "@/components/create-request/add-query-button";

export function QueryParameterSection({ url }: { url?: string }) {
    const queryEntriesRef = useRef<HTMLDivElement>(null);
    const urlObj = url ? new URL(url) : null;
    const queriesNumber = urlObj?.searchParams ? Array.from(urlObj.searchParams.entries()).length : 0;

    return (
        <div id="params-section" className="p-5">
            <div ref={queryEntriesRef} className="flex flex-col gap-y-4 mb-4">
                {urlObj?.searchParams && Array.from(urlObj.searchParams.entries()).map(([key, value], index) => (
                    // @ts-ignore
                    <query-entry title={`Query Param No ${index + 1}`} key={`query-param-${key}`} key-val={key} value={value}></query-entry>
                ))}
            </div>

            <AddQueryButton index={queriesNumber} queryTitle="Query Param No" containerRef={queryEntriesRef}>
                Add Query Paramter
            </AddQueryButton>
        </div>
    );
}