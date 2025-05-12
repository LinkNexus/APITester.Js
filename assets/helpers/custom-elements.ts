import { createElement, ReactNode } from "react";
import { createRoot, Root } from "react-dom/client";
import { dashToCamel, upperCamelToDashCase } from "@/helpers/string-manipulation";

export async function loadCustomElements() {
    const modules = import.meta.glob([
        "../elements/**/*.ts",
        "../elements/**/*.tsx",
    ], { import: "default" });

    for (const module of Object.values(modules)) {
        const element = await module() as any;
        if (element && element.prototype.getTagName)
            customElements.define(upperCamelToDashCase(element.prototype.getTagName()), element);
    }
}

export abstract class AbstractCustomElement extends HTMLElement {
    private root?: Root;

    abstract Element(props?: any): ReactNode;
    abstract getTagName(): string;

    protected getAllAttributes() {
        return [...this.attributes].reduce<Record<string, string>>((acc, attr) => {
            acc[dashToCamel(attr.name)] = attr.value;
            return acc;
        }, {});
    }

    protected connectedCallback() {
        const attributes = this.getAllAttributes();

        const content = this.innerText;

        this.style.display = "contents";
        this.root = createRoot(this);
        this.root.render(
            createElement(this.Element.bind(this), {
                ...attributes,
                content
            })
        );
    }

    protected disconnectedCallback() {
        this.root?.unmount();
    }
}