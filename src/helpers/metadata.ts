export const metadata = (name: string, value: any) => {
    return function (target: Function, propertyKey?: string | undefined, descriptor?: PropertyDescriptor | undefined) {
        if (!propertyKey && !descriptor) {
            if (target.prototype[`_metadata_${name}`]) {
                target.prototype[`_metadata_${name}`] = {
                    ...target.prototype[`_metadata_${name}`],
                    constructor: value
                };
            } else {
                target.prototype[`_metadata_${name}`] = {
                    constructor: value
                };
            }
            return;
        } else if (propertyKey && descriptor) {
            if (target.prototype[`_metadata_${name}`]) {
                target.prototype[`_metadata_${name}`] = {
                    ...target.prototype[`_metadata_${name}`],
                    [propertyKey]: value
                };
            } else {
                target.prototype[`_metadata_${name}`] = {
                    [propertyKey]: value
                };
            }
        }
    }
}

export const getMetadata = (name: string, target: Function, prop?: string | undefined) => {
    if (prop) {
        return target.prototype[`_metadata_${name}`]?.[prop];
    } else {
        return target.prototype[`_metadata_${name}`];
    }
}

export const hasMetadata = (name: string, target: Function, prop?: string | undefined) => {
    if (prop) {
        return target.prototype[`_metadata_${name}`]?.[prop] !== undefined;
    } else {
        return target.prototype[`_metadata_${name}`] !== undefined;
    }
}