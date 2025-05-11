import Collection from "#models/Collection";
import { BaseLayout } from "#views/layout";

export function ImportRequestPage({ collections }: { collections: Collection[] }) {
    return (
        <BaseLayout title="Import Request from cURL" description="Import Request from cURL">
            <main class="flex items-center justify-center w-full">
                <div class="lg:max-w-[80%] lg:w-[80%] background-gradient rounded-xl flex flex-col items-center justify-center gap-y-3 py-5 px-3 w-full">
                    <h1 class="w-full md:text-3xl text-2xl font-bold text-center mb-5">
                        Import Request from cURL
                    </h1>

                    <import-request-form collections={JSON.stringify(collections)} />
                </div>
            </main>
        </BaseLayout>
    )
}