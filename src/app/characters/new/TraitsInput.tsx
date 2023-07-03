"use client";

import { countSpentTokensOfHeroism } from "@/features/character/countTokensOfHeroism";
import { useMemo, useState } from "react";

export function TraitsInput() {
  const [cache, setCache] = useState<{ [key: string]: number }>({});

  const totalSpent = useMemo(
    () => countSpentTokensOfHeroism(Object.values(cache)),
    [cache]
  );
  const availableTokens = useMemo(() => 80 - totalSpent, [totalSpent]);

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setCache({
      ...cache,
      [name]: parseInt(value),
    });
  };

  return (
    <>
      <p>
        Available tokens <span>{availableTokens}</span>
      </p>

      <fieldset className="flex flex-col flex-wrap">
        <legend>Power</legend>

        <TraitInput name="combat" onChange={handleOnChange} />
        <TraitInput name="hearts" onChange={handleOnChange} />
        <TraitInput name="athletics" onChange={handleOnChange} />
        <TraitInput name="civilization" onChange={handleOnChange} />
        <TraitInput name="fortitude" onChange={handleOnChange} />
        <TraitInput name="intimidate" onChange={handleOnChange} />
        <TraitInput name="mechanics" onChange={handleOnChange} />
        <TraitInput name="smithing" onChange={handleOnChange} />
      </fieldset>

      <fieldset className="flex flex-col flex-wrap">
        <legend>Wisdom</legend>

        <TraitInput name="willpower" onChange={handleOnChange} />
        <TraitInput name="magic" onChange={handleOnChange} />
        <TraitInput name="arcana" onChange={handleOnChange} />
        <TraitInput name="perception" onChange={handleOnChange} />
        <TraitInput name="influence" onChange={handleOnChange} />
        <TraitInput name="perform" onChange={handleOnChange} />
        <TraitInput name="discipline" onChange={handleOnChange} />
        <TraitInput name="enchanting" onChange={handleOnChange} />
      </fieldset>

      <fieldset className="flex flex-col flex-wrap">
        <legend>Courage</legend>

        <TraitInput name="accuracy" onChange={handleOnChange} />
        <TraitInput name="stamina" onChange={handleOnChange} />
        <TraitInput name="nature" onChange={handleOnChange} />
        <TraitInput name="agility" onChange={handleOnChange} />
        <TraitInput name="command" onChange={handleOnChange} />
        <TraitInput name="insight" onChange={handleOnChange} />
        <TraitInput name="guile" onChange={handleOnChange} />
        <TraitInput name="cooking" onChange={handleOnChange} />
      </fieldset>

      <input type="submit" value="Create" disabled={availableTokens === 0} />
    </>
  );
}

interface TraitInputProps extends React.HTMLProps<HTMLInputElement> {}

function TraitInput({ name, ...props }: TraitInputProps) {
  return (
    <label>
      <span className="capitalize">{name}</span>
      <input
        {...props}
        name={name}
        type="number"
        min={1}
        max={5}
        defaultValue={1}
        className="text-black"
      />
    </label>
  );
}
