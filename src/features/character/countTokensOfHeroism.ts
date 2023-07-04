import type { Traits } from "./types";

export function countTokensOfHeroism(traits: Traits): number {
  const allTraits = [
    ...Object.values(traits.courage),
    ...Object.values(traits.wisdom),
    ...Object.values(traits.power),
  ].map((trait) => trait.trait);

  return countSpentTokensOfHeroism(allTraits);
}

export function countSpentTokensOfHeroism(traits: number[]): number {
  return traits.reduce((total, value) => rule(value) + total, 0);
}

export function rule(input: number, initialValue: number = 1): number {
  if (input <= initialValue) return 0;

  return input + rule(input - 1, initialValue);
}

export function calculateMaximumAvailableTrait(
  availableSlots: number,
  value: number = 1
): number {
  for (let i = value; i <= 10; i++) {
    if (rule(i + 1, value) > availableSlots) {
      return i;
    }
  }

  return 10;
}
