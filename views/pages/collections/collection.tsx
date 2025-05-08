import type Collection from "#models/Collection";
import {BaseLayout} from "#views/layout";

export function CollectionPage ({ collection }: { collection: Collection }) {
    return (
        <BaseLayout>
            <main class="flex items-center justify-center w-full">
                <div class="lg:max-w-[80%] lg:w-[80%] background-gradient rounded-xl flex flex-col items-center justify-center gap-y-3 py-5 px-3 w-full">
                    <h1 class="w-full md:text-3xl text-2xl font-bold text-center mb-5">
                        Collection: {collection.name}
                    </h1>

                    <div class="ml-auto flex gap-x-4">
                        <a href={`/?collection=${collection.id}`}
                                class="flex items-center gap-x-2 cursor-pointer clickable hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5}
                                 stroke="currentColor" class="size-6 text-primary">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <span>Add</span>
                        </a>

                        <request-delete-button/>
                    </div>
                </div>
            </main>
        </BaseLayout>
    )
}