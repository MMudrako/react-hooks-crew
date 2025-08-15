'use client'
// This directive is specific to Next.js 13+ — it marks this component 
// as a Client Component (can use hooks, browser APIs, etc.).


/* in this demo there are two state that watch the same lists state from the first glance and may appear 
redundant, but stay with me is for demonstration purposes 
the first state is needed to watch any ongoing selection changes that user can make 
the second is to store the finalized list 
in this demo we create an agent instance and user can select custom properties for this instance - agent traits
which will be displayed at the bottom of ui */

import React, { useState } from 'react';
import traits from "../../data/agentTraits.json"
import { capitalize } from '../../lib/format';

// --------------------
// Type Definitions
// --------------------
type Agent = {
    id: number,
    name: string,
    specialty: string,
    status: "Untrained" | "Trained" | "Active" | "Retired", // Union literal type restricts values
    assignedBy: string,
    mode: string,
    icon: string,
    traits?: Traits // Optional property
}

type Traits = {
    regions?: string[],
    backgrounds?: string[],
    languages?: string[],
    martialArts?: string[],
    fieldRoles?: string[]
}

// --------------------
// Utility to create a fresh default agent
// --------------------
function createDefaultAgent(): Agent {
    return {
        "id": 1,
        "name": "Linus Blaze",
        "specialty": "Recon",
        "status": "Untrained",
        "assignedBy": "The Sorter",
        "mode": "training",
        "icon": "🕵️‍♂️"
        // traits is optional, so we don't include it by default
    }
}

const defaultAgent = createDefaultAgent();

// The traits data comes from a JSON file in the data directory
const agentTraits: Traits = traits;

export default function TheKeeper() {

    // Stores user's current selections before finalizing the list
    const [selectedTraits, setSelectedTraits] = useState<Record<string, string[]>>({});

    //Stores user's final selection of the custom traits list
    const [traitsList, setTraitsList] = useState<Traits>({});


    // --------------------
    // Event Handlers
    // --------------------
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        // value looks like "regions-Asia" — split into ["regions", "Asia"]
        const [cat, val] = value.split("-").map(s => s.trim());

        setSelectedTraits(prevTraits => ({
            ...prevTraits,
            [cat]: checked
                // If checked, add to that category's array
                ? [...(prevTraits[cat] || []), val]
                // If unchecked, remove it from the array
                : (prevTraits[cat] || []).filter(v => v !== val)
        }));
    }

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Radios enforce only one selection per category
        const [cat, val] = e.target.value.split("-").map(s => s.trim());
        setSelectedTraits(prevTraits => ({
            ...prevTraits,
            [cat]: [val] // Replace entire array with just the selected value
        }));
    }

    const addTraits = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Commit selected traits after form submission
        setTraitsList(selectedTraits);
    }


    const clearList = () => {
        // Reset selections 
        setSelectedTraits({});
        setTraitsList({});

    }

    // --------------------
    // UI
    // --------------------
    return (
        <>
            {/* Display agent's base info */}
            <div>
                {Object.entries(defaultAgent).map(([key, value]) => (
                    <div key={key} >
                        <p className="inline font-oxanium">
                            {capitalize(key)}{': '}
                        </p>
                        <p className="inline font-oxanium">
                            {capitalize(value)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Trait selection form */}
            <form onSubmit={addTraits}>
                <fieldset>
                    <legend>Choose traits for your custom agent</legend>

                    {Object.entries(agentTraits).map(([category, values], index, arr) => (
                        <label htmlFor={category} key={category}
                            className='min-h-[20px] text-2xl inline-block'>
                            {capitalize(category)}

                            {index === arr.length - 1
                                // Last category → radio buttons
                                ? <ul>
                                    {values?.map((value, i) => (
                                        <li key={i} className='text-sm text-gray-800'>
                                            <input
                                                type='radio'
                                                name='radio'
                                                value={`${category}-${value}`}
                                                onChange={handleRadioChange}
                                            />
                                            {capitalize(value)}
                                        </li>
                                    ))}
                                </ul>
                                // Other categories → checkboxes
                                : <ul>
                                    {values?.map((value, i) => (
                                        <li key={i} className='text-sm text-gray-800'>
                                            <input
                                                type='checkbox'
                                                value={`${category}-${value}`}
                                                onChange={handleCheckboxChange}
                                            />
                                            {capitalize(value)}
                                        </li>
                                    ))}
                                </ul>
                            }
                        </label>
                    ))}
                </fieldset>

                <button
                    type='submit'
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                >
                    Add Traits
                </button>
            </form>

            {/* Display chosen traits */}
            <div>
                {traitsList && Object.entries(traitsList).map(([cat, values]) => (
                    <div key={cat}>
                        <h3 className="inline font-oxanium">
                            {capitalize(cat)}{': '}
                        </h3>
                        <ul className="inline font-oxanium">
                            {values.map(v => <li key={v}>{capitalize(v)}</li>)}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Reset button */}
            <button
                onClick={clearList}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
                Clear Selection
            </button>
        </>
    )
}
