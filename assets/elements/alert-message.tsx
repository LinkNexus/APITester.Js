import { AbstractCustomElement } from "@/helpers/custom-elements";
import React from "react";

export default class AlertMessage extends AbstractCustomElement {
    getTagName(): string {
        return "alert-message";
    }

    Element({ type, content }: {
        type: "success" | "error" | "info",
        content: string,
    }): React.ReactNode {
        let bgClass = "";

        switch (type) {
            case "success":
                bgClass = "bg-green-500";
                break;
            case "error":
                bgClass = "bg-red-400";
                break;
            default:
                bgClass = "bg-blue-500";
                break;
        }

        return (
            <div
                className={`items-center justify-center p-5 w-full text-center rounded-xl ${bgClass} ${this.className}`}>
                {content}
            </div>
        );
    }
}