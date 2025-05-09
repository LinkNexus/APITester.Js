import { AbstractCustomElement } from "@/helpers/custom-elements";
import type Collection from "#models/Collection";
import { MouseEventHandler, useEffect, useState } from "react";
import { DeleteButton } from "@/components/buttons/delete-button";

export default class CollectionsList extends AbstractCustomElement {
    private collections: Collection[] = JSON.parse(this.getAttribute("collections") || "[]");

    Element() {
        const [collections, setCollections] = useState(this.collections);
        const [isSelecting, setIsSelecting] = useState(false);

        const deleteCollection: MouseEventHandler<HTMLButtonElement> = async (e) => {
            const collectionId = (e.currentTarget as HTMLButtonElement).dataset.collectionId;
            if (!collectionId) return;

            const res = await fetch(`/collections/${collectionId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setCollections((prevState) => prevState.filter((collection) => collection.id !== Number(collectionId)));
            } else {
                console.error("Error deleting collection:", res.statusText);
            }
        }

        const deleteSelectedCollections = async () => {
            const $inputs = document.querySelectorAll("input[type=checkbox]:checked");
            const ids = Array.from($inputs).map((input) => Number((input as HTMLInputElement).dataset.collectionId!));
            const res = await fetch("/collections", {
                method: "DELETE",
                body: JSON.stringify(ids)
            });

            if (res.ok) {
                setCollections((prevState) => prevState.filter((collection) => !ids.includes(collection.id)));
            } else {
                console.error("Error deleting collection:", res.statusText);
            }

            document.dispatchEvent(new CustomEvent("entities.checkboxes.delete:hide"));
        }

        useEffect(() => {
            document.addEventListener("collection:created", (e) => {
                setCollections((prevState) => [...prevState, (e as CustomEvent).detail]);
            });

            document.addEventListener("entities.checkboxes.delete:show", () => {
                setIsSelecting(true);
            });

            document.addEventListener("entities.checkboxes.delete:hide", () => {
                setIsSelecting(false);
            })
        }, []);

        return (
            <div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 collections">
                    {collections.map((collection) => (
                        <div key={`collection-${collection.id}`} className="flex gap-x-4 items-center">
                            <input data-collection-id={collection.id} type="checkbox"
                                className={isSelecting ? "" : "hidden " + "size-5 rounded bg-transparent focus:bg-primary"} />
                            <div
                                className="bg-accent-2 w-full h-full not-last-of-type:w-full p-4 shadow-lg hover:shadow-xl rounded-lg border border-primary transition-shadow duration-300"
                                key={collection.id}
                            >
                                <div className="flex flex-col gap-2">
                                    <span
                                        className="text-lg font-semibold block w-full text-center">{collection.name}</span>
                                    <span className="text-gray-500 block">{collection.description}</span>
                                </div>

                                <div className="flex justify-end gap-2 mt-5 my-auto">
                                    <a
                                        href={`/collections/${collection.id}`}
                                        className="flex items-center justify-center w-10 h-10 bg-secondary hover:bg-primary rounded-full clickable shadow-md hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </a>
                                    <DeleteButton onClick={deleteCollection} entity={"collection"}
                                        id={collection.id.toString()} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {isSelecting &&
                    <button onClick={deleteSelectedCollections} className="button-primary w-full mt-6 gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        <span>Delete</span>
                    </button>
                }
            </div>
        );
    }
}