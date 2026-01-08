import React from "react";
import { capitalize } from "@/lib/format";

type RadioGroupProps = {
    category: string;
    values: string[];
    selectedValue: string;
    onChange: (category: string, selectedValue: string) => void;
}

export function TraitRadioGroup({
    category,
    values,
    selectedValue,
    onChange,
}: RadioGroupProps) {
    return (
        <fieldset className="mb-4">


            <ul className="mt-2 space-y-1">
                {values.map((value) => {
                    const checked = value === selectedValue
                    return (
                        <li key={value} className="flex items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name={category}
                                id={`${category}-${value}`}
                                checked={checked}
                                value={value}
                                onChange={(e) =>
                                    onChange(category, e.target.value)
                                }

                            />
                            <label htmlFor={`${category}-${value}`}>
                                {capitalize(value)}
                            </label>
                        </li>
                    );
                })}
            </ul>
        </fieldset>
    );

}