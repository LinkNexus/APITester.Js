import { useRef } from "react";
import { AddQueryButton } from "@/components/create-request/add-query-button";

export function QueryParameterSection({ url }: { url?: string }) {
    const queryEntriesRef = useRef<HTMLDivElement>(null);
    const urlObj = url ? new URL(url) : null;

    return (
        <div id="params-section" className="p-5">
            <div ref={queryEntriesRef} className="flex flex-col gap-y-4 mb-4">
                {urlObj?.searchParams && Array.from(urlObj.searchParams.entries()).map(([key, value]) => (
                    // @ts-ignore
                    <query-entry key={`query-param-${key}`} key-val={key} value={value}></query-entry>
                ))}
            </div>

            <AddQueryButton queryTitle="Query Param No" containerRef={queryEntriesRef}>
                Add Query Paramter
            </AddQueryButton>
        </div>
    );
}