"use client";

import {
  countSpentTokensOfHeroism,
  calculateMaximumAvailableTrait,
} from "@/features/character/countTokensOfHeroism";
import { useMemo, useState } from "react";
import { TraitFieldset } from "./TraitFieldset";
import {
  OnChange,
  TraitInput,
  ValidateTrait,
  CalculateInputCap,
} from "./TraitInput";
import {
  COURAGE_TRAITS,
  POWER_TRAITS,
  WISDOM_TRAITS,
} from "@/features/character/types";

type TraitsInputProps = {
  maximumTokensOfHeroism: number;
};

export function TraitsInput({ maximumTokensOfHeroism }: TraitsInputProps) {
  const [cache, setCache] = useState<{ [key: string]: number }>({});

  const totalSpent = useMemo(
    () => countSpentTokensOfHeroism(Object.values(cache)),
    [cache]
  );

  const availableTokens = useMemo(
    () => maximumTokensOfHeroism - totalSpent,
    [maximumTokensOfHeroism, totalSpent]
  );

  const validateTrait: ValidateTrait = (value, nextValue) => {
    return (
      nextValue < value ||
      calculateMaximumAvailableTrait(nextValue, value) <= availableTokens
    );
  };

  const calculateInputCap: CalculateInputCap = (value) => {
    return calculateMaximumAvailableTrait(availableTokens, value);
  };

  const handleChange: OnChange = (name, value) => {
    setCache({
      ...cache,
      [name]: value,
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
          {POWER_TRAITS.map((trait) => (
            <TraitInput
              name={trait}
              cap={5}
              initialValue={1}
              validateTrait={validateTrait}
              onChange={handleChange}
              calculateCap={calculateInputCap}
            />
          ))}
        </TraitFieldset>

        <TraitFieldset traitName="Wisdom">
          {WISDOM_TRAITS.map((trait) => (
            <TraitInput
              name={trait}
              cap={5}
              initialValue={1}
              validateTrait={validateTrait}
              onChange={handleChange}
              calculateCap={calculateInputCap}
            />
          ))}
        </TraitFieldset>

        <TraitFieldset traitName="Courage">
          {COURAGE_TRAITS.map((trait) => (
            <TraitInput
              name={trait}
              cap={5}
              initialValue={1}
              validateTrait={validateTrait}
              onChange={handleChange}
              calculateCap={calculateInputCap}
            />
          ))}
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
