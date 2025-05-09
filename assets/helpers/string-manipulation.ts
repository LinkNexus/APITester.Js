export function upperCamelToDashCase(str: string) {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // Insert dash between lowercase/number and uppercase
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // Insert dash between two uppercase when the second is followed by lowercase
        .toLowerCase();
}

export function dashToCamel(str) {
    return str.replace(/-([a-z])/g, function (match, letter) {
        return letter.toUpperCase();
    });
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}