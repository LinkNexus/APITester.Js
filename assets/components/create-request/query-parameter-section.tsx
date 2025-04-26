import {useRef} from "react";
import {AddQueryButton} from "@/components/create-request/add-query-button";

export function QueryParameterSection() {
    const queryEntriesRef = useRef<HTMLDivElement>(null);

    return (
        <div id="params-section" className="p-5">
            <div ref={queryEntriesRef} className="flex flex-col gap-y-4 mb-4">
            </div>

            <AddQueryButton queryTitle="Query Param No" containerRef={queryEntriesRef}>
                Add Query Paramter
            </AddQueryButton>
        </div>
    );
}