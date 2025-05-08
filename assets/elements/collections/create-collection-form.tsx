import {AbstractCustomElement} from "@/helpers/custom-elements";

export default class CreateCollectionForm extends AbstractCustomElement {
    Element() {
        return (
            <div id="create-collection-modal" tabIndex={-1} aria-hidden="true"
                 style={{background: "rgba(0, 0, 0, 0.4)"}}
                 className="flex overflow-y-auto overflow-x-hidden items-center justify-center fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-accent-2 rounded-lg shadow-sm border-primary border">
                        <div
                            className="flex items-center justify-between p-4 md:p-5 border-b border-primary rounded-t">
                            <h3 className="text-xl w-full text-center font-semibold">
                                Create Collection
                            </h3>
                            <button data-modal-close="create-collection" type="button"
                                    className="clickable text-primary bg-transparent hover:bg-primary hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                            <form action={this.createCollection} className="max-w-full w-full flex flex-col gap-y-6">
                                <div className="flex flex-col gap-y-2 w-full">
                                    <label>Name</label>
                                    <input required name="name" type="text"/>
                                </div>

                                <div className="flex flex-col gap-y-2 w-full">
                                    <label>Description</label>
                                    <textarea className="min-h-20"/>
                                </div>

                                <button className="button-primary">
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    async createCollection(formData: FormData) {
        const data = Object.fromEntries(formData.entries());
        const res = await fetch("/collections", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            document.dispatchEvent(new CustomEvent("collection:created", {detail: await res.json()}))
        }
    }
}