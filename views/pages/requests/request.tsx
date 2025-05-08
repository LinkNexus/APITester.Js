import type Request from "#models/Request";
import { BaseLayout } from "#views/layout";

export function RequestPage({ request }: { request: Request }) {
    return (
        <BaseLayout>
            <main class="flex items-center justify-center w-full">
                <div class="lg:max-w-[80%] lg:w-[80%] background-gradient rounded-xl flex flex-col items-center justify-center gap-y-3 py-5 px-3 w-full">
                    <h1 class="w-full md:text-3xl text-2xl font-bold text-center mb-5">
                        Edit Request
                    </h1>

                    <create-request-form request={JSON.stringify(request)} />
                </div>
            </main>
        </BaseLayout>
    )
}