// Temporary client-side data for lookup fields.
// Replace getLookupOptions with an API request when the backend is available.
export const mockLookupData = {
  Students: [
    { id: 1, fullName: "Joel John Centeno" },
    { id: 2, fullName: "Mary Anne Centeno" },
    { id: 3, fullName: "John Cena" },
  ],
};

export function getLookupOptions({
  entity,
  displayAttribute,
  searchText = "",
}) {
  const search = searchText.trim().toLowerCase();
  const records = mockLookupData[entity] ?? [];

  if (!search) {
    return [];
  }

  return records.filter((record) =>
    String(record[displayAttribute] ?? "")
      .toLowerCase()
      .includes(search),
  );
}
