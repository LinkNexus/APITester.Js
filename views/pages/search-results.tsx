import Collection from "#models/Collection";
import Request from "#models/Request";
import { BaseLayout } from "#views/layout";

export function SearchResultsPage({ searchResults }: { searchResults: Record<string, any>[] }) {
    return (
        <BaseLayout>
            <main class="flex items-center justify-center w-full">
                <div class="lg:max-w-[80%] lg:w-[80%] background-gradient rounded-xl flex flex-col items-center justify-center gap-y-3 py-5 px-3 w-full">
                    <h1 class="w-full md:text-3xl text-2xl font-bold text-center mb-5">
                        Search Results
                    </h1>
                    <div class="w-full">
                        <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {searchResults.map((result: Request | Collection, index) => {
                                if (result instanceof Request) {
                                    const collection = result.getCollection();

                                    return (

                                        <div
                                            class="bg-accent-2 w-full h-full not-last-of-type:w-full p-4 shadow-lg hover:shadow-xl rounded-lg border border-primary transition-shadow duration-300"
                                        >
                                            <div class="flex flex-col gap-2 max-w-full">
                                                <div>
                                                    <span class="text-lg font-semibold">Request Type:</span>
                                                    <span class="text-gray-500 block">{result.requestType}</span>
                                                </div>
                                                <div>
                                                    <span class="text-lg font-semibold">Request URL:</span>
                                                    <span
                                                        class="text-gray-500 block overflow-hidden text-ellipsis whitespace-nowrap max-h-6"
                                                        title={result.url}
                                                    >
                                                        {result.url}
                                                    </span>
                                                </div>
                                                {result.method !== "null" && (
                                                    <div>
                                                        <span class="text-lg font-semibold">Method:</span>
                                                        <span class="text-gray-500 block">{result.method}</span>
                                                    </div>
                                                )}
                                                {collection && (
                                                    <div>
                                                        <span class="text-lg font-semibold">Collection:</span>
                                                        <span class="text-gray-500 block">{collection.name}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div class="flex justify-end gap-2 mt-5 my-auto">
                                                <a
                                                    href={`/requests/${result.id}`}
                                                    class="flex items-center justify-center w-10 h-10 bg-secondary hover:bg-primary rounded-full clickable shadow-md hover:shadow-lg transition-shadow duration-300"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    )
                                } else if (result instanceof Collection) {
                                    return (
                                        <div
                                            class="bg-accent-2 w-full h-full not-last-of-type:w-full p-4 shadow-lg hover:shadow-xl rounded-lg border border-primary transition-shadow duration-300"
                                        >
                                            <div class="flex flex-col gap-2">
                                                <span
                                                    class="text-lg font-semibold block w-full text-center">{result.name}</span>
                                                <span class="text-gray-500 block">{result.description}</span>
                                            </div>

                                            <div class="flex justify-end gap-2 mt-5 my-auto">
                                                <a
                                                    href={`/collections/${result.id}`}
                                                    class="flex items-center justify-center w-10 h-10 bg-secondary hover:bg-primary rounded-full clickable shadow-md hover:shadow-lg transition-shadow duration-300"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        {searchResults.length === 0 && (
                            <div class="text-center mt-4">
                                <p class="text-gray-500">No results found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </BaseLayout>
    )
}