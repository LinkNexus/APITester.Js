import { useEffect, useState } from "react";

export function useEntitySelection<T>({ items, setItems, entity }: { items: (T & { id: number })[], setItems: React.Dispatch<React.SetStateAction<(T & { id: number })[]>>, entity: "request" | "collection" }) {
    const [isSelecting, setIsSelecting] = useState(false);

    const deleteSelectedEntities = async () => {
        const $inputs = document.querySelectorAll("input[type=checkbox]:checked");
        const ids = Array.from($inputs).map((input) => Number((input as HTMLInputElement).dataset.collectionId!));
        const res = await fetch(`/${entity}s`, {
            method: "DELETE",
            body: JSON.stringify(ids)
        });

        if (res.ok) {
            setItems((prevState) => prevState.filter((item) => !ids.includes(item.id)));
        } else {
            console.error("Error deleting collection:", res.statusText);
        }

        document.dispatchEvent(new CustomEvent("entities.checkboxes.delete:hide"));
    }

    useEffect(() => {
        document.addEventListener(`${entity}:created`, (e) => {
            setItems((prevState) => [...prevState, (e as CustomEvent).detail]);
        });

        document.addEventListener("entities.checkboxes.delete:show", () => {
            setIsSelecting(true);
        });

        document.addEventListener("entities.checkboxes.delete:hide", () => {
            setIsSelecting(false);
        })
    }, []);

    return {
        isSelecting,
        deleteSelectedEntities
    }
}