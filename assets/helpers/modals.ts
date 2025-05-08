export const toggleModal = (modalId: string) => {
    const $modal = document.querySelector(`#${modalId}-modal`);
    $modal?.classList.add("hidden");
    $modal?.classList.remove("flex");
}

export const openModal = (modalId: string) => {
    const $modal = document.querySelector(`#${modalId}-modal`);
    $modal?.classList.remove("hidden");
    $modal?.classList.add("flex");
}

export const closeModal = (modalId: string) => {
    const $modal = document.querySelector(`#${modalId}-modal`);
    $modal?.classList.add("hidden");
    $modal?.classList.remove("flex");
}

export function registerModals() {
    const $modalsTriggers = document.querySelectorAll("[data-modal-target]");
    const $modalCloseTriggers = document.querySelectorAll("[data-modal-close]");
    const $modalOpenTriggers = document.querySelectorAll("[data-modal-open]");

    $modalsTriggers.forEach(($trigger) => {
        $trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const modalId = $trigger.getAttribute("data-modal-target")!;
            toggleModal(modalId);
        });
    });

    $modalCloseTriggers.forEach(($trigger) => {
        $trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const modalId = $trigger.getAttribute("data-modal-close")!;
            closeModal(modalId);
        });
    });

    $modalOpenTriggers.forEach(($trigger) => {
        $trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const modalId = $trigger.getAttribute("data-modal-open")!;
            openModal(modalId);
        });
    });
}