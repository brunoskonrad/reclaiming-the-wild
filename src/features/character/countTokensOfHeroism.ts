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

function rule(input: number): number {
  if (input <= 1) return 0;

  return input + rule(input - 1);
}
