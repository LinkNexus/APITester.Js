import { ComponentProps, PropsWithChildren, RefObject } from "react";

type Props = ComponentProps<"button"> & {
    containerRef: RefObject<HTMLDivElement | null>;
    queryTitle: string;
}

export function AddQueryButton({ containerRef, children, queryTitle, className, ...props }: PropsWithChildren<Props>) {
    let queryQty = 0;

    const appendEntry = () => {
        queryQty++;
        const entry = document.createElement("query-entry");
        entry.setAttribute("id", queryQty.toString());
        entry.setAttribute("title", `${queryTitle} ${queryQty}`);
        containerRef.current?.appendChild(entry);
    }

    return (
        <button onClick={appendEntry} type="button" className={`w-fit button-secondary gap-x-2 ${className}`} {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>
                {children}
            </span>
        </button>
    );
}