export const filterOption = (input: string, option: {
    Uid: string;
    Name: string,
    Id: number,
}) => (option?.Name ?? '').toLowerCase().includes(input.toLowerCase());