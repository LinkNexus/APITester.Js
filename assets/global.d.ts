declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['query-entry']: { id: number };
            ['alert-message']: { message: string, ["is-file"]?: boolean, id?: number|null };
        }
    }
}