export const addIndexToData = (data: any, keyName: string = "Row") => {
    if (!data) return [];

    // Use `map` to add an index to each item in the data array
    return data.map((item: any, index: number) => ({
        ...item,
        [keyName]: index + 1, // Auto-incrementing index starting from 1
    }));
};