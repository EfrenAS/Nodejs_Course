export function multiplication({ MULTIPLICAND }: { MULTIPLICAND: number }) {
  try {
    if (MULTIPLICAND < 1)
      throw new Error("MULTIPLICAND must be greater than 0");

    const result = [];
    for (let i = 1; i <= 10; i++) {
      result.push(`${MULTIPLICAND} x ${i} = ${i * MULTIPLICAND}`);
    }

    return result;
  } catch (error) {
    throw new Error(`Error multiplication: ${error}`);
  }
}
