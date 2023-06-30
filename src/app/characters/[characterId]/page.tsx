import { HeartContainer } from "@/components/PointContainer/HeartContainer";
import { MagicContainer } from "@/components/PointContainer/MagicContainer";
import { StaminaContainer } from "@/components/PointContainer/StaminaContainer";
import { Point } from "@/components/PointContainer/type";
import { Wrapper } from "@/components/Wrapper";
import { prisma } from "@/lib/db";

export default async function CharacterDetailPage({
  params,
}: {
  params: { characterId: string };
}) {
  const character = await prisma.character.findFirst({
    where: { id: params.characterId },
  });

  return (
    <Wrapper>
      <p>Hello Character</p>

      <HeartContainer point={character?.hitPoint as Point} />

      <MagicContainer point={character?.manaPoint as Point} />

      <StaminaContainer point={character?.staminaPoint as Point} />
    </Wrapper>
  );
}
