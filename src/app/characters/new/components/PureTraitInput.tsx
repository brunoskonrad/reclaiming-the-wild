import { useState } from "react";
import type { Trait } from "@/features/character/types";

type HTMLSelectElementWithoutOnChange = Omit<
  React.HTMLProps<HTMLSelectElement>,
  "onChange" | "name"
>;

export interface TraitInputProps extends HTMLSelectElementWithoutOnChange {
  cap: number;
  name: Trait;
  initialValue: number;
  validateTrait?(value: number): boolean;
  onChange?(value: number): void;
}

export const MIN_TRAIT = 1;
export const MAX_TRAIT = 10;

export function TraitInput({
  cap,
  name,
  initialValue,
  validateTrait = (_value: number) => true,
  onChange,
  ...props
}: TraitInputProps) {
  const options = range(MIN_TRAIT, MAX_TRAIT);
  const [trait, setTrait] = useState<number>(initialValue);

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const nextTrait = parseInt(event.currentTarget.value);

    if (validateTrait(nextTrait)) {
      setTrait(nextTrait);
      onChange?.(nextTrait);
    } else {
      setTrait(trait);
    }
  };

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
            disabled={option > Math.max(cap, trait)}
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
