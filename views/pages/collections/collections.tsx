import { BaseLayout } from "#views/layout";
import type Collection from "#models/Collection";

export function CollectionsPage({ collections }: { collections: Collection[] }) {
    return (
        <BaseLayout title="Collections" description="Manage your collections">
            <main class="flex flex-wrap items-center justify-center w-full">
                <div
                    class="lg:max-w-[80%] lg:w-[90%] overflow-auto background-gradient rounded-xl flex flex-col items-center justify-center gap-y-3 py-5 px-8 w-full">
                    <h1 class="w-full md:text-4xl text-3xl font-bold text-center mb-5 text-white">
                        Collections
                    </h1>

                    <div class="ml-auto flex gap-x-4">
                        <button data-modal-open="create-collection"
                            class="flex items-center gap-x-2 cursor-pointer clickable hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5}
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span>Create</span>
                        </button>

                        <entities-delete-button />
                    </div>

                    <collections-list collections={JSON.stringify(collections)} />

                    <create-collection-form />
                </div>
            </main>
        </BaseLayout>
    )
}