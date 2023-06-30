import type { Traits } from "./types";

export function parseFromFormData(data: FormData): Traits {
  const collect = formDataCollector(data);

  return {
    power: {
      combat: { trait: collect("combat"), bonus: 0 },
      hearts: { trait: collect("hearts"), bonus: 0 },
      athletics: { trait: collect("athletics"), bonus: 0 },
      civilization: { trait: collect("civilization"), bonus: 0 },
      fortitude: { trait: collect("fortitude"), bonus: 0 },
      intimidate: { trait: collect("intimidate"), bonus: 0 },
      mechanics: { trait: collect("mechanics"), bonus: 0 },
      smithing: { trait: collect("smithing"), bonus: 0 },
    },
    wisdom: {
      willpower: { trait: collect("willpower"), bonus: 0 },
      magic: { trait: collect("magic"), bonus: 0 },
      arcana: { trait: collect("arcana"), bonus: 0 },
      perception: { trait: collect("perception"), bonus: 0 },
      influence: { trait: collect("influence"), bonus: 0 },
      perform: { trait: collect("perform"), bonus: 0 },
      discipline: { trait: collect("discipline"), bonus: 0 },
      enchanting: { trait: collect("enchanting"), bonus: 0 },
    },
    courage: {
      accuracy: { trait: collect("accuracy"), bonus: 0 },
      stamina: { trait: collect("stamina"), bonus: 0 },
      nature: { trait: collect("nature"), bonus: 0 },
      agility: { trait: collect("agility"), bonus: 0 },
      command: { trait: collect("command"), bonus: 0 },
      insight: { trait: collect("insight"), bonus: 0 },
      guile: { trait: collect("guile"), bonus: 0 },
      cooking: { trait: collect("cooking"), bonus: 0 },
    },
  };
}

function formDataCollector(data: FormData): (key: string) => number {
  return (key: string) => {
    if (!data.has(key)) return 0;

    return parseInt(data.get(key) as string);
  };
}
