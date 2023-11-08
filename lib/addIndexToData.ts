export const addIndexToData = (data: any[] | undefined, keyName: string = "Row", startFrom: number = 1) => {

    console.log(data);
    
    if (data && data?.length) {
        return data?.map((item: any, index: number) => ({
            ...item,
            [keyName]: index + startFrom, // Auto-incrementing index starting from 1
        }))
    }
    
    return [];
};