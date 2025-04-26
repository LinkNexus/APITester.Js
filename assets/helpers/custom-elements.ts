import {createElement, ReactNode} from "react";
import {createRoot, Root} from "react-dom/client";
import {upperCamelToDashCase} from "@/helpers/string-manipulation";

export async function loadCustomElements() {
    const modules = import.meta.glob([
        "../elements/**/*.ts",
        "../elements/**/*.tsx",
    ], { import: "default" });

    for (const module of Object.values(modules)) {
        const element = await module() as any;
        if (element) customElements.define(upperCamelToDashCase(element.name), element);
    }
}

export abstract class AbstractCustomElement extends HTMLElement{
    private root?: Root;

    abstract Element(props?: any): ReactNode;

    protected connectedCallback() {
        const attributes = [...this.attributes].reduce<Record<string, string>>((acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
        }, {});

        this.style.display = "contents";
        this.root = createRoot(this);
        this.root.render(
            createElement(this.Element, attributes)
        );
    }

    protected disconnectedCallback() {
        this.root?.unmount();
    }
}