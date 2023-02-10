type Variant = {
  name: string;
  values: string[];
};

export function generateCombinations(
  variants: Variant[]
): { [key: string]: string }[] {
  if (variants.length === 0) {
    return [];
  }

  if (variants.length === 1) {
    return variants[0].values.map((variant) => ({
      [variants[0].name]: variant,
    }));
  }

  const result: { [key: string]: string }[] = [];
  const subCombinations = generateCombinations(variants.slice(1));
  for (const variant of variants[0].values) {
    for (const subCombination of subCombinations) {
      result.push({ ...subCombination, [variants[0].name]: variant });
    }
  }
  return result;
}
