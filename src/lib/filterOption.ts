export const filterOption = (input: string, option: any, key: string = "") => {
  return (
    (option?.Name || option?.name || option?.label || option[key] || "") ??
    ""
  )
    .toLowerCase()
    .includes(input.toLowerCase());
};
