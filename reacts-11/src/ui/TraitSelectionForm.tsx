import React from "react";
import { Traits } from "@/types";
import { TraitCheckboxGroup } from "./CheckboxGroup";
import { TraitRadioGroup } from "./RadioGroup";
import { capitalize } from "@/lib/format";

type TraitSelectionFormProps = {

    agentTraits: Traits,
    selectedTraits: Record<string, string[]>,
    onRadioChange: (category: string, selectedValue: string) => void,
    onCheckboxChange: (category: string, value: string, checked: boolean) => void,
    onSubmit: (selectedTraits: Record<string, string[]>) => void
}

export function TraitSelectionForm({
    agentTraits,
    selectedTraits,
    onRadioChange,
    onCheckboxChange,
    onSubmit
}: TraitSelectionFormProps) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(selectedTraits)
        }}>
            <fieldset>
                <legend>Choose traits for your custom agent</legend>

                {Object.entries(agentTraits).map(([category, values], index, arr) => (
                    <label htmlFor={category} key={category}
                        className='min-h-[20px] text-2xl inline-block'>
                        {capitalize(category)}

                        {index === arr.length - 1
                            ? (
                                <TraitRadioGroup
                                    key={category}
                                    category={category}
                                    values={values}
                                    selectedValue={selectedTraits[category]
                                        ? selectedTraits[category][0]
                                        : ""
                                    }
                                    onChange={onRadioChange}
                                />
                            )
                            : (
                                <TraitCheckboxGroup

                                    key={category}
                                    category={category}
                                    values={values}
                                    selectedValues={selectedTraits[category] ?? []}
                                    onChange={onCheckboxChange}
                                />
                            )
                        }
                    </label>

                ))}
            </fieldset>
            <button type='submit' className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
                Add Traits
            </button>
        </form>
    )
}
