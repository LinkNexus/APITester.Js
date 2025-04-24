import {createElement, FunctionComponent} from "react";
import {Root} from "react-dom/client";

function defineCustomElement(name: string, target: any, extendsTag: string|null = null) {
    if (!customElements.get(name)) {
        if (extendsTag) {
            customElements.define(name, target, { extends: extendsTag })
        } else {
            customElements.define(name, target);
        }
    } else {
        console.warn(`Custom element ${name} is already defined.`);
    }
}

export function customElement(name: string, extendsTag: string|null = null) {
    return function (target: any) {
        defineCustomElement(name, target, extendsTag);
    }
}

export function reactCustomElement(name: string, extendsTag: string | null = null) {
    return function (target: any) {
        defineCustomElement(name, class extends target {
            private root?: Root;

            connectedCallback() {
                super.connectedCallback?.call(this);
                const attributes = [...this.attributes].reduce<Record<string, string>>((acc, attr) => {
                    acc[attr.name] = attr.value;
                    return acc;
                }, {});

                import("react-dom/client").then(({ createRoot }) => {
                    this.root = createRoot(this);
                    this.root.render(
                        createElement(super.Element, attributes)
                    );
                })
            }

            disconnectedCallback() {
                super.disconnectedCallback?.call(this);
                this.root?.unmount();
            }
        }, extendsTag);
    }
}

export function loadCustomElements() {
    import.meta.glob([
        "../elements/**/*.ts",
        "../elements/**/*.tsx"
    ], { eager: true });
}