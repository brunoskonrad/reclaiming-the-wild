import { Prisma } from "@prisma/client";

export type Traits = Pick<
  Prisma.CharacterGetPayload<{}>,
  "courage" | "wisdom" | "power"
>;

export const POWER_TRAITS = [
  "combat",
  "hearts",
  "athletics",
  "civilization",
  "fortitude",
  "intimidate",
  "mechanics",
  "smithing",
] as const;

export const WISDOM_TRAITS = [
  "willpower",
  "magic",
  "arcana",
  "perception",
  "influence",
  "perform",
  "discipline",
  "enchanting",
] as const;

export const COURAGE_TRAITS = [
  "accuracy",
  "stamina",
  "nature",
  "agility",
  "command",
  "insight",
  "guile",
  "cooking",
] as const;

export type Trait =
  | (typeof POWER_TRAITS)[number]
  | (typeof WISDOM_TRAITS)[number]
  | (typeof COURAGE_TRAITS)[number];
