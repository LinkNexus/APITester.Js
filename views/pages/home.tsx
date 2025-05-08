import type Collection from "#models/Collection";
import { BaseLayout } from "#views/layout";

export function HomePage({ collection, collections }: { collection: string, collections: Collection[] }) {
    return (
        <BaseLayout>
            <main class="flex items-center justify-center w-full">
                <div class="lg:max-w-[80%] lg:w-[80%] background-gradient rounded-xl flex flex-col items-center justify-center gap-y-3 py-5 px-3 w-full">
                    <h1 class="w-full md:text-3xl text-2xl font-bold text-center mb-5">
                        Create a new Request
                    </h1>

                    <create-request-form collections={JSON.stringify(collections)} collection={collection} />
                </div>
            </main>
        </BaseLayout>
    );
}