export const addIndexToData = (data: any[] | undefined, keyName: string = "Row", startFrom: number = 1) => {
    if (!data) return [];


    return data.map((item: any, index: number) => ({
        ...item,
        [keyName]: index + startFrom + 1, // Auto-incrementing index starting from 1
    }));
};