import React from "react";
import { capitalize } from "@/lib/format";

type CheckboxGroupProps = {
    category: string;
    values: string[];
    selectedValues: string[]; // controlled
    onChange: (category: string, value: string, checked: boolean) => void;
};

export function TraitCheckboxGroup({
    category,
    values,
    selectedValues,
    onChange,
}: CheckboxGroupProps) {
    return (
        <fieldset className="mb-4">

            <ul className="mt-2 space-y-1">
                {values.map((value) => {
                    const checked = selectedValues.includes(value);//on first render will be false
                    //and then updated by e.target.checked


                    return (
                        <li key={value} className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                id={`${category}-${value}`}
                                checked={checked}
                                onChange={(e) =>
                                    onChange(category, value, e.target.checked)
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
