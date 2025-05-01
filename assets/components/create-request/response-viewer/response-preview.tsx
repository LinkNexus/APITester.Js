import { useEffect, useRef, useState } from "react"
import JSONFormatter from "json-formatter-js";

export function ResponsePreview({ text, contentType }: { text: string, contentType: string }) {
    const previewContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (contentType.includes("json")) {
            try {
                const json = JSON.parse(text);
                const formatter = new JSONFormatter(json, 2, {
                    hoverPreviewEnabled: true,
                    theme: 'dark',
                    animateOpen: true,
                    animateClose: true,
                });
                previewContainerRef.current!.innerHTML = "";
                previewContainerRef.current!.appendChild(formatter.render());
            } catch (e) {
                previewContainerRef.current!.innerText = text;
            }
        }

        else if (contentType.includes("html")) {
            previewContainerRef.current!.innerHTML = text;
        }

        else if (contentType.includes("xml")) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            const serializer = new XMLSerializer();
            const xmlString = serializer.serializeToString(xmlDoc);
            previewContainerRef.current!.innerText = xmlString;
        }

        else {
            previewContainerRef.current!.innerText = text;
        }
    }, [text, contentType]);

    useEffect(() => {
        const container = previewContainerRef.current;
        if (container) {
            container.scrollTop = 0; // Scroll to top when new content is loaded
        }
    }, []);

    return (
        <div ref={previewContainerRef} id="response-preview-section"
            className="special-container w-full min-h-30 max-h-64 overflow-auto">
        </div>
    );
}