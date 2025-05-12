import "./react-refresh.js";
import "./styles/app.css";
import { loadCustomElements } from "@/helpers/custom-elements";
import hljs from "highlight.js";
import hljsJSON from "highlight.js/lib/languages/json"
import hljsXML from "highlight.js/lib/languages/xml"
import hljsHTML from "highlight.js/lib/languages/xml"
import 'highlight.js/styles/atom-one-dark.css';
import { registerTabs } from "@/helpers/tabs";
import { registerModals } from "./helpers/modals.js";
// @ts-ignore
import hljsCurl from "highlightjs-curl";

const mutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        registerTabs(mutation.target);
    }
});

mutationObserver.observe(document, {
    childList: true,
    subtree: true,
});

hljs.registerLanguage("json", hljsJSON);
hljs.registerLanguage("xml", hljsXML);
hljs.registerLanguage("html", hljsHTML);
hljs.registerLanguage("curl", hljsCurl);

loadCustomElements();
registerTabs();
registerModals();

