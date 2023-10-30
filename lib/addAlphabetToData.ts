export const addAlphabetToData = (data: any[] | undefined, keyName: string = "Row", startFrom: number = 1) => {
    if (!data) return [];

    return data.map((item: any, index: number) => {
        const alphabetChar = String.fromCharCode(97 + index + startFrom - 1); // Convert index to alphabet character
        return {
            ...item,
            [keyName]: alphabetChar,
        };
    });
};