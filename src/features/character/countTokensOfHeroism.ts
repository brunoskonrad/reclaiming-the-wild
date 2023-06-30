import type { Traits } from "./types";

export function countTokensOfHeroism(traits: Traits): number {
  const allTraits = [
    ...Object.values(traits.courage),
    ...Object.values(traits.wisdom),
    ...Object.values(traits.power),
  ];

  return allTraits.reduce((total, trait) => {
    return rule(trait.trait) + total;
  }, 0);
}

function rule(input: number): number {
  if (input <= 1) return 0;

  return input + rule(input - 1);
}
