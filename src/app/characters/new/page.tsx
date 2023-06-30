import { Wrapper } from "@/components/Wrapper";
import { prisma } from "@/lib/db";
import { createCharacter } from "./actions";

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
          <fieldset className="flex flex-col flex-wrap">
            <legend>Power</legend>

            <TraitInput name="combat" />
            <TraitInput name="hearts" />
            <TraitInput name="athletics" />
            <TraitInput name="civilization" />
            <TraitInput name="fortitude" />
            <TraitInput name="intimidate" />
            <TraitInput name="mechanics" />
            <TraitInput name="smithing" />
          </fieldset>

          <fieldset className="flex flex-col flex-wrap">
            <legend>Wisdom</legend>

            <TraitInput name="willpower" />
            <TraitInput name="magic" />
            <TraitInput name="arcana" />
            <TraitInput name="perception" />
            <TraitInput name="influence" />
            <TraitInput name="perform" />
            <TraitInput name="discipline" />
            <TraitInput name="enchanting" />
          </fieldset>

          <fieldset className="flex flex-col flex-wrap">
            <legend>Courage</legend>

            <TraitInput name="accuracy" />
            <TraitInput name="stamina" />
            <TraitInput name="nature" />
            <TraitInput name="agility" />
            <TraitInput name="command" />
            <TraitInput name="insight" />
            <TraitInput name="guile" />
            <TraitInput name="cooking" />
          </fieldset>
          <input type="submit" value="Create" />
        </form>
      </main>
    </Wrapper>
  );
}

type TraitInputProps = {
  name: string;
};

function TraitInput({ name }: TraitInputProps) {
  return (
    <label>
      <span className="capitalize">{name}</span>
      <input
        name={name}
        type="number"
        min={0}
        max={5}
        defaultValue={0}
        className="text-black"
      />
    </label>
  );
}
