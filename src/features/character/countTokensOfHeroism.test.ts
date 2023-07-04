import {
  countTokensOfHeroism,
  rule,
  calculateMaximumAvailableTrait,
} from "./countTokensOfHeroism";

describe("src/features/character/countTokensOfHeroism.ts", () => {
  it("returns 0 when all traits are 0", () => {
    const fixture = {
      power: {
        combat: { trait: 0, bonus: 0 },
        hearts: { trait: 0, bonus: 0 },
        athletics: { trait: 0, bonus: 0 },
        civilization: { trait: 0, bonus: 0 },
        fortitude: { trait: 0, bonus: 0 },
        intimidate: { trait: 0, bonus: 0 },
        mechanics: { trait: 0, bonus: 0 },
        smithing: { trait: 0, bonus: 0 },
      },
      wisdom: {
        willpower: { trait: 0, bonus: 0 },
        magic: { trait: 0, bonus: 0 },
        arcana: { trait: 0, bonus: 0 },
        perception: { trait: 0, bonus: 0 },
        influence: { trait: 0, bonus: 0 },
        perform: { trait: 0, bonus: 0 },
        discipline: { trait: 0, bonus: 0 },
        enchanting: { trait: 0, bonus: 0 },
      },
      courage: {
        accuracy: { trait: 0, bonus: 0 },
        stamina: { trait: 0, bonus: 0 },
        nature: { trait: 0, bonus: 0 },
        agility: { trait: 0, bonus: 0 },
        command: { trait: 0, bonus: 0 },
        insight: { trait: 0, bonus: 0 },
        guile: { trait: 0, bonus: 0 },
        cooking: { trait: 0, bonus: 0 },
      },
    };

    expect(countTokensOfHeroism(fixture)).toBe(0);
  });

  it("returns the total number of tokens of heroism spent", () => {
    const fixture = {
      power: {
        combat: { trait: 3, bonus: 0 },
        hearts: { trait: 4, bonus: 0 },
        athletics: { trait: 2, bonus: 0 },
        civilization: { trait: 3, bonus: 0 },
        fortitude: { trait: 1, bonus: 0 },
        intimidate: { trait: 3, bonus: 0 },
        mechanics: { trait: 2, bonus: 0 },
        smithing: { trait: 2, bonus: 0 },
      },
      wisdom: {
        willpower: { trait: 2, bonus: 0 },
        magic: { trait: 4, bonus: 0 },
        arcana: { trait: 1, bonus: 0 },
        perception: { trait: 1, bonus: 0 },
        influence: { trait: 3, bonus: 0 },
        perform: { trait: 2, bonus: 0 },
        discipline: { trait: 3, bonus: 0 },
        enchanting: { trait: 2, bonus: 0 },
      },
      courage: {
        accuracy: { trait: 1, bonus: 0 },
        stamina: { trait: 4, bonus: 0 },
        nature: { trait: 1, bonus: 0 },
        agility: { trait: 3, bonus: 0 },
        command: { trait: 3, bonus: 0 },
        insight: { trait: 2, bonus: 0 },
        guile: { trait: 2, bonus: 0 },
        cooking: { trait: 2, bonus: 0 },
      },
    };

    expect(countTokensOfHeroism(fixture)).toBe(80);
  });
});

describe("rule", () => {
  test("from 2 to 3 returns 3", () => expect(rule(3, 2)).toBe(3));
  test("from 1 to 3 returns 5", () => expect(rule(3, 1)).toBe(5));
});

describe("calculateMaximumAvailableTrait", () => {
  test("manyCases", () => {
    expect(calculateMaximumAvailableTrait(3, 2)).toBe(3);
    expect(calculateMaximumAvailableTrait(5, 3)).toBe(4);
  });
});
