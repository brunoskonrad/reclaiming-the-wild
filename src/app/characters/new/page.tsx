import { Wrapper } from "@/components/Wrapper";
import { prisma } from "@/lib/db";
import { createCharacter } from "./actions";
import { TraitsInput } from "./TraitsInput";

export default async function NewCharacter() {
  const races = await prisma.race.findMany({
    where: { primary: true },
  });

  return (
    <Wrapper>
      <main>
        <h1>New Character</h1>

        <form action={createCharacter} className="flex flex-col flex-wrap">
          <select name="race" id="race" className="text-black">
            {races.map((race) => {
              return <option value={race.id}>{race.name}</option>;
            })}
          </select>
          <TraitsInput />
        </form>
      </main>
    </Wrapper>
  );
}
