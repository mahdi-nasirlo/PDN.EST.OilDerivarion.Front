export function convertKeysToLowerCase(obj: any) {
    const result: any = {};
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const newKey = key.charAt(0).toLowerCase() + key.slice(1);
            result[newKey] = obj[key];
        }
    }
    return result;
}
