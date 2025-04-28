export function getValuesFromEntry($entry: Element) {
    const $name = $entry.querySelector("input");
    const $value = $entry.querySelector("textarea");

    if ($name && $name.value !== "" && $value) {
        return {
            name: $name.value,
            value: $value.value
        }
    }

    return null;
}