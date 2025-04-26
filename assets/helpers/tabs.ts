export function registerTabs($element: Node = document) {
    const $tabGroups = ($element as HTMLElement).querySelectorAll("[data-tabs-group]");

    for (const $tabGroup of $tabGroups) {
        const $tabsTriggers = $tabGroup.querySelector("[data-tabs-triggers]");
        const $tabsContainer = $tabGroup.querySelector("[data-tabs-container]");
        const defaultTab = $tabGroup.getAttribute("data-default-tab");
        const $defaultTab = defaultTab ?
            $tabsContainer?.querySelector(`#${defaultTab}`) :
            $tabsContainer?.firstElementChild;

        const allTabs = Array.from($tabsContainer!.children);
        const allTabsTriggers = Array.from($tabsTriggers!.children);

        allTabs.forEach(($tab) => {
            if ($tab.id !== $defaultTab?.id) {
                $tab.classList.add("hidden");
            } else {
                allTabsTriggers.forEach(($trigger) => {
                    if ($trigger.getAttribute("data-tab-section") === $tab.id) {
                        $trigger.classList.add("active");
                    }
                })
            }
        });

        allTabsTriggers.forEach(($tabTrigger) => {
            $tabTrigger.addEventListener("click", () => {
                allTabsTriggers.forEach(($trigger) => {
                    if ($trigger.getAttribute("data-tab-section") === $tabTrigger.getAttribute("data-tab-section")) {
                        $trigger.classList.add("active");
                    } else {
                        $trigger.classList.remove("active");
                    }
                })

                allTabs.forEach(($tab) => {
                    if ($tab.id === $tabTrigger.getAttribute("data-tab-section")) {
                        $tab.classList.remove("hidden");
                    } else {
                        $tab.classList.add("hidden");
                    }
                })
            })
        })
    }
}