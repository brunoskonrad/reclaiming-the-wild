import { useMemo, useState } from "react";
import type { Trait } from "@/features/character/types";

type HTMLSelectElementWithoutOnChange = Omit<
  React.HTMLProps<HTMLSelectElement>,
  "onChange" | "name"
>;

export type ValidateTrait = (value: number, nextValue: number) => boolean;
export type CalculateInputCap = (value: number) => number;
export type OnChange = (name: string, value: number) => void;

export interface TraitInputProps extends HTMLSelectElementWithoutOnChange {
  cap: number;
  name: Trait;
  initialValue: number;
  validateTrait?: ValidateTrait;
  onChange?: OnChange;
  calculateCap?: CalculateInputCap;
}

export const MIN_TRAIT = 1;
export const MAX_TRAIT = 10;

export function TraitInput({
  cap,
  name,
  initialValue,
  validateTrait = (_value: number) => true,
  onChange,
  calculateCap = (_value: number) => MAX_TRAIT,
  ...props
}: TraitInputProps) {
  const options = range(MIN_TRAIT, MAX_TRAIT);
  const [trait, setTrait] = useState<number>(initialValue);

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const nextTrait = parseInt(event.currentTarget.value);

    if (validateTrait(trait, nextTrait)) {
      setTrait(nextTrait);
      onChange?.(name, nextTrait);
    } else {
      setTrait(trait);
    }
  };

  const realCap = useMemo(() => {
    return Math.min(calculateCap(trait), cap);
  }, [calculateCap, cap]);

  return (
    <label className="grid grid-cols-3 gap-4 lg:grid-cols-4 mb-1">
      <span className="capitalize">{name}</span>

      <select
        {...props}
        value={trait}
        name={name}
        onChange={handleChange}
        data-testid={`trait-input:${name}`}
        className="text-black col-span-2 lg:col-span-3"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            disabled={option > Math.max(realCap, trait)}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function range(min: number, max: number): number[] {
  return new Array(max - min + 1)
    .fill(min)
    .map((value, index) => value + index);
}
