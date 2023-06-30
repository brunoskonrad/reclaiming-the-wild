import { HeartContainer } from "@/components/PointContainer/HeartContainer";
import { Point } from "@/components/PointContainer/type";
import { Wrapper } from "@/components/Wrapper";
import { getServerUser } from "@/features/auth/getServerUser";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function CharactersPage() {
  const user = await getServerUser();
  const characters = await prisma.character.findMany({
    where: { userId: user.id },
    include: {
      race: true,
    },
  });

  return (
    <Wrapper>
      <main>
        <ul>
          {characters.map((character) => {
            return (
              <li>
                <Link href={`/characters/${character.id}`}>
                  <p>{character.name}</p>
                  <p>{character.race.name}</p>

                  <HeartContainer point={character.hitPoint as Point} />
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </Wrapper>
  );
}
