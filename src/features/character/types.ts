import { Prisma } from "@prisma/client";

export type Traits = Pick<
  Prisma.CharacterGetPayload<{}>,
  "courage" | "wisdom" | "power"
>;
