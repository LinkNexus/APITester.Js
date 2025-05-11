export function parseCurl(curlCmd: string): { method: string; url: string; headers: Record<string, string>; body: string | null | Record<string, string>, bodyType: string } {
    const methodMatches = curlCmd.match(/-X\s*(\S+)/);
    const urlMatches = curlCmd.match(/(https?:\/\/[^\s]+)/);

    const headers = getHeaders(curlCmd);
    const body = getBody(curlCmd);

    return {
        method: methodMatches ? methodMatches[1].toUpperCase() : body ? "POST" : "GET",
        url: urlMatches ? urlMatches[0] : "",
        headers: headers,
        body: body,
        bodyType: inferBodyType(headers, body),
    }
}

function getBody(curlCmd: string): string | null | Record<string, string> {
    const bodyRegex = /(?:-d|--data(?:-raw|-binary)?|-D)\s+(['"])?((?:\\\1|(?:(?!\1).))*)\1/g;

    const matches = [];
    let match;

    while ((match = bodyRegex.exec(curlCmd)) !== null) {
        matches.push(match[2]);
    }

    return matches.length > 0 ? matches.join("&") : getFormData(curlCmd) || null;
}

function inferBodyType(headers: Record<string, string>, body: string | null | Record<string, string>): string {
    if (body) {
        if (body instanceof Object) {
            return "form-data";
        } else if (headers && headers["content-type"]) {
            const contentType = headers["content-type"];
            if (contentType.includes("json")) return "json";
            else if (contentType.includes("xml")) return "xml";
            else if (contentType.includes("html")) return "html";
        }
        else return "text";
    }
    return "no-body";
}

function getHeaders(curlCommand: string): Record<string, string> {
    // Regular expression to match header options (-H or --header)
    const headerRegex = /(?:--header|-H)\s+(?:'|")([^'"]+)(?:'|")/g;

    const headers: Record<string, string> = {};
    let match;

    // Find all header matches
    while ((match = headerRegex.exec(curlCommand)) !== null) {
        // Split the header into key and value
        const headerParts = match[1].split(': ');
        if (headerParts.length >= 2) {
            const key = headerParts[0];
            const value = headerParts.slice(1).join(': '); // Handle values that may contain colons
            headers[key.toLowerCase()] = value;
        }
    }

    return headers;
}

function getFormData(curlCommand: string): Record<string, string> {
    const formData: Record<string, string> = {};
    const regex = /-F\s+"([^=]+)=((?:\\"|[^"])+)"/g;

    let match;
    while ((match = regex.exec(curlCommand)) !== null) {
        const key = match[1];
        const value = match[2];

        // Check if the value is a file path
        if (value.startsWith("@")) {
            const filePath = value.slice(1);
            formData[key] = filePath;
        } else {
            formData[key] = value;
        }
    }

    return formData;
}