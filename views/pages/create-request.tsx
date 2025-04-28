import { BaseLayout } from "#views/layout";

export function CreateRequestPage() {
    return (
        <BaseLayout>
            <main class="lg:max-w-[80%] lg:w-[80%] flex items-center justify-center w-full">
                <div class="background-gradient rounded-xl flex flex-col items-center justify-center gap-y-3 py-5 px-3 w-full">
                    <h1 class="w-full md:text-3xl text-2xl font-bold text-center mb-5">
                        Create a new HTTP Request
                    </h1>

                    <create-request-form />
                </div>
            </main>
        </BaseLayout>
    );
}