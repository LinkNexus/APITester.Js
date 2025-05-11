import { BaseLayout } from "#views/layout";
import Request from "#models/Request";

export function RequestHistoryPage({ groupedRequests }: { groupedRequests: Record<string, Request[]> }) {
    return (
        <BaseLayout title="Requests History" description="View all requests made to the API">
            <main class="flex flex-wrap items-center justify-center w-full">
                <div class="lg:max-w-[80%] lg:w-[90%] overflow-auto background-gradient rounded-xl flex flex-col items-center justify-center gap-y-3 py-5 px-8 w-full">
                    <h1 class="w-full md:text-4xl text-3xl font-bold text-center mb-5 text-white">
                        All Requests
                    </h1>

                    <div class="flex w-full mb-3">
                        <div class="ml-auto flex gap-x-4">
                            <a href={"/"}
                                class="flex items-center gap-x-2 cursor-pointer clickable hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5}
                                    stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span>Add</span>
                            </a>

                            <entities-delete-button />
                        </div>
                    </div>

                    <grouped-requests requests={JSON.stringify(groupedRequests)} />
                </div>
            </main>
        </BaseLayout>
    );
}