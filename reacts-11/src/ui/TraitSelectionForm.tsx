import React from "react";
import { Traits } from "@/types";
import { TraitScrolSelectGroup } from "./ScrolSelectGroup";
import { TraitRadioGroup } from "./RadioGroup";
import { capitalize } from "@/lib/format";

type TraitSelectionFormProps = {

    agentTraits: Traits,
    selectedTraits: Record<string, string[]>,
    onRadioChange: (category: string, selectedValue: string) => void,
    onScrolSelectChange: (category: string, value: string, checked: boolean) => void,
    onSubmit: (selectedTraits: Record<string, string[]>) => void
}

export function TraitSelectionForm({
    agentTraits,
    selectedTraits,
    onRadioChange,
    onScrolSelectChange,
    onSubmit
}: TraitSelectionFormProps) {


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(selectedTraits)
        }}>
            <fieldset>
                <legend>Choose traits for your new agent in training</legend>

                {[...Object.entries(agentTraits)].reverse().map(([category, values], index, arr) => (
                    <label htmlFor={category} key={category}
                        className='min-h-[20px] text-sm inline-block gap-2'>
                        {capitalize(category)}

                        {index === 0
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
                                <TraitScrolSelectGroup

                                    key={category}
                                    category={category}
                                    values={values}
                                    selectedValues={selectedTraits[category] ?? []}
                                    onChange={onScrolSelectChange}
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
