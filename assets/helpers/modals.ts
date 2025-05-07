export function registerModals() {
    const modalsTriggers = document.querySelectorAll("[data-modal-target]");

    modalsTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute("data-modal-target");
            const modal = document.querySelector(`#${modalId}`);
            if (modal) {
                modal.classList.remove("hidden");
                modal.classList.add("flex");
            }
        });
    });
}