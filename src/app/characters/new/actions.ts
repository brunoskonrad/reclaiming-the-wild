"use server";

import { countTokensOfHeroism } from "@/features/character/countTokensOfHeroism";
import { parseFromFormData } from "@/features/character/traitsParser";
import { prisma } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function createCharacter(data: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }

  const user = await prisma.user.findFirst({
    where: { name: session.user?.name },
    include: {
      sessions: true,
    },
  });

  if (!user) {
    throw new Error("no user found");
  }

  const traits = parseFromFormData(data);
  const spentTokens = countTokensOfHeroism(traits);

  if (spentTokens > 80) {
    throw new Error("don't have enough Tokens of Heroism");
  }

  const hitpoint = traits.power.hearts.trait * 4;
  const mana = traits.wisdom.magic.trait * 4;
  const stamina = traits.courage.stamina.trait * 4;

  const result = await prisma.character.create({
    data: {
      userId: user.id,
      hitPoint: {
        current: hitpoint,
        maximum: hitpoint,
        temporary: 0,
      },
      manaPoint: {
        current: mana,
        maximum: mana,
        temporary: 0,
      },
      staminaPoint: {
        current: stamina,
        maximum: stamina,
        temporary: 0,
      },
      name: "Unknown",
      raceId: data.get("race") as string,
      tokenOfHeroism: {
        available: 80 - spentTokens,
        total: 80,
      },
      ...traits,
    },
  });

  redirect(`/characters/${result.id}`);
}
