export function sortByIndex(array: any[] | undefined, propertyName: string) {
  if (!array) return [];

  const sortedData = [...array];
  const persianCollator = new Intl.Collator("fa");
  sortedData.sort((a, b) =>
    persianCollator.compare(a[propertyName], b[propertyName])
  );

  return sortedData;
}
