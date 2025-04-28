export function ResponseContent({ text }: { text: string }) {
    return (
        <div id="response-content-section" className="special-container w-full min-h-30 max-h-64 overflow-auto">
            {text}
        </div>
    )
}