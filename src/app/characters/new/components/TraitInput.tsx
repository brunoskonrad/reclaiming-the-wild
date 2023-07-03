import { rule } from "@/features/character/countTokensOfHeroism";
import { useState } from "react";

export interface TraitInputProps extends React.HTMLProps<HTMLSelectElement> {
  min?: number;
  max?: number;
  maximumAvailableTrait: number;
  availableTokens: number;
}

export function TraitInput({
  name,
  min = 1,
  max = 10,
  maximumAvailableTrait,
  availableTokens,
  onChange,
  ...props
}: TraitInputProps) {
  const options = range(min, max);
  const [value, setValue] = useState(1);

  return (
    <label className="grid grid-cols-3 gap-4 lg:grid-cols-4 mb-1">
      <span className="capitalize">{name}</span>

      <select
        {...props}
        value={value}
        name={name}
        onChange={(event) => {
          const nextValue = parseInt(event.currentTarget.value);

          if (nextValue > value && rule(nextValue) > availableTokens) {
            setValue(value);
          } else {
            setValue(nextValue);
            onChange?.(event);
          }
        }}
        className="text-black col-span-2 lg:col-span-3"
      >
        {options.map((option) => (
          <option
            value={option}
            disabled={option > Math.max(maximumAvailableTrait, value)}
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
