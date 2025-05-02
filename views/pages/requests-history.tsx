import { BaseLayout } from "#views/layout";
import Request from "../../src/database/models/Request.js";

export function RequestHistoryPage({ requests }: { requests: Request[] }) {
    return (
        <BaseLayout>
            <h1>Fuck You!</h1>
            {JSON.stringify(requests)}
        </BaseLayout>
    )
}