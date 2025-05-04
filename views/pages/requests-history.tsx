import { BaseLayout } from "#views/layout";
import Request from "#models/Request";

export function RequestHistoryPage({ groupedRequests }: { groupedRequests: Record<string, Request[]> }) {
    return (
        <BaseLayout>
            <main class="flex flex-wrap items-center justify-center w-full">
                <div class="lg:max-w-[80%] lg:w-[90%] overflow-auto background-gradient rounded-xl flex flex-col items-center justify-center gap-y-3 py-5 px-8 w-full">
                    <h1 class="w-full md:text-4xl text-3xl font-bold text-center mb-5 text-white">
                        All Requests
                    </h1>
                    <grouped-requests requests={JSON.stringify(groupedRequests)} />
                </div>
            </main>
        </BaseLayout>
    );
}