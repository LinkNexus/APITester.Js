declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['query-entry']: { id: number };
            ['alert-message']: { type: "alert" | "success" };
        }
    }
}