export const filterOption = (
  input: string,
  option: {
    Uid: string;
    uid: string;
    Name: string;
    name?: string;
    Id: number;
    id?: number;
  }
) =>
  ((option?.Name || option?.name || "") ?? "")
    .toLowerCase()
    .includes(input.toLowerCase());
