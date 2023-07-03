"use client";

import {
  countSpentTokensOfHeroism,
  rule,
} from "@/features/character/countTokensOfHeroism";
import { useMemo, useState } from "react";
import { TraitFieldset } from "./TraitFieldset";
import { TraitInput } from "./TraitInput";

export function TraitsInput() {
  const [cache, setCache] = useState<{ [key: string]: number }>({});

  const totalSpent = useMemo(
    () => countSpentTokensOfHeroism(Object.values(cache)),
    [cache]
  );
  const availableTokens = useMemo(() => 80 - totalSpent, [totalSpent]);

  const maximumAvailableTrait = useMemo(() => {
    return Math.min(calculateMaximumAvailableTrait(availableTokens), 5);
  }, [availableTokens]);

  const handleOnChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;

    setCache({
      ...cache,
      [name]: parseInt(value),
    });
  };

  return (
    <>
      <p>
        Available tokens{" "}
        <span data-testid="available-tokens">{availableTokens}</span>
      </p>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <TraitFieldset traitName="Power">
          <TraitInput
            name="combat"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="hearts"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="athletics"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="civilization"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="fortitude"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="intimidate"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="mechanics"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="smithing"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
        </TraitFieldset>

        <TraitFieldset traitName="Wisdom">
          <TraitInput
            name="willpower"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="magic"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="arcana"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="perception"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="influence"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="perform"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="discipline"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="enchanting"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
        </TraitFieldset>

        <TraitFieldset traitName="Courage">
          <TraitInput
            name="accuracy"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="stamina"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="nature"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="agility"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="command"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="insight"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="guile"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
          <TraitInput
            name="cooking"
            maximumAvailableTrait={maximumAvailableTrait}
            availableTokens={availableTokens}
            onChange={handleOnChange}
          />
        </TraitFieldset>
      </section>

      <input
        type="submit"
        value="Create"
        disabled={availableTokens !== 0}
        className="btn btn-blue"
      />
    </>
  );
}

function calculateMaximumAvailableTrait(availableSlots: number): number {
  for (let i = 0; i < 10; i++) {
    if (rule(i + 1) > availableSlots) {
      return i;
    }
  }

  return 10;
}
