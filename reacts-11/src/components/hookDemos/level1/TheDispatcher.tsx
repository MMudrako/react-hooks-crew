'use client'

/* in this demo I will illustrate how useTransition can improve app 
perfromance when thrid party or DB needs to be fetched */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import traits from "../../../data/agentTraits.json"
import { capitalize } from '../../../lib/format';
import { LegendBuilderTransition } from '../AgentBuilder';


// ----------------------------
// Type definitions
// ----------------------------
type Agent = {
    id: number,
    name: string,
    specialty: string,
    status: "Untrained" | "Trained" | "Active" | "Retired",
    assignedBy: string,
    mode: string,
    icon: string,
    traits?: Traits
}

type Traits = {
    regions?: string[],
    backgrounds?: string[],
    languages?: string[],
    martialArts?: string[],
    fieldRoles?: string[]
}

// ----------------------------
// Helper to create a default agent with empty traits
// ----------------------------
function createDefaultAgent(): Agent {
    return {
        id: 1,
        name: "Linus Blaze",
        specialty: "Recon",
        status: "Untrained",
        assignedBy: "The Sorter",
        mode: "training",
        icon: "🕵️‍♂️",
        traits: {
            regions: [],
            backgrounds: [],
            languages: [],
            martialArts: [],
            fieldRoles: []
        }
    }
}

const defaultAgent = createDefaultAgent();
const agentTraits: Traits = traits;

// LocalStorage key MUST be a string
const AGENT_KEY = 'agent';

export default function TheDispatcher() {
    // Stores the trait selections from form inputs before committing to agent
    const [selectedTraits, setSelectedTraits] = useState<Record<string, string[]>>({});


    //Stores user's final selection of the custom traits list
    const [traitsList, setTraitsList] = useState<Traits>({});

    // Stores the actual agent object, including traits
    const [agent, setAgent] = useState<Agent>(defaultAgent);

    //test if it is the first render
    const isFirstRender = useRef(true);

    const [legend, setLegend] = useState("");
    const [loading, setLoading] = useState(false);

    // 1. Build dynamic prompt from traits (expensive, but memoized)

    const prompt = useMemo(() => {

        console.log("Building prompt...");
        const { regions, backgrounds, languages, martialArts, fieldRoles } = agent.traits ?? {};

        return `
                Write a heroic legend about an agent:

                Name: ${agent.name}
                Specialty: ${agent.specialty}
                Status: ${agent.status}
                Assigned By: ${agent.assignedBy}
                Mode: ${agent.mode}

                ${regions && regions.length > 0
                ? `This agent had missions in the ${regions.join(", ")}.`
                : `This agent has yet to explore their first region.`}

                ${fieldRoles && fieldRoles.length > 0
                ? `They often served in roles such as ${fieldRoles.join(", ")}.`
                : `Their role remains undefined.`}

                ${backgrounds && backgrounds.length > 0
                ? `They came from a ${backgrounds.join(", ")} background.`
                : `Their background remains a mystery.`}

                ${languages && languages.length > 0
                ? `They speak ${languages.join(", ")}.`
                : `They have no known spoken languages.`}

                ${martialArts && martialArts.length > 0
                ? `They are skilled in ${martialArts.join(", ")}.`
                : `They have yet to master any martial art.`}
                `;
    }, [agent]);






    // ----------------------------
    // Event handlers for f
    // orm changes
    // ----------------------------
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const [cat, val] = value.split("-").map(s => s.trim());

        setSelectedTraits(prevTraits => ({
            ...prevTraits,
            [cat]: checked
                ? [...(prevTraits[cat] || []), val] // Add if checked
                : (prevTraits[cat] || []).filter(v => v !== val) // Remove if unchecked
        }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [cat, val] = e.target.value.split("-").map(s => s.trim());
        setSelectedTraits(prevTraits => ({
            ...prevTraits,
            [cat]: [val] // Only one value for radio buttons
        }));
    };

    const addTraits = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Commit selected traits after form submission
        setTraitsList(selectedTraits);
    };

    const clearList = () => {
        // Reset selections 
        setSelectedTraits({});
        setTraitsList({});

    }

    const saveAgent = () => {
        // Update agent with current selectedTraits
        setAgent(prevAgent => ({
            ...prevAgent,
            traits: selectedTraits
        }));
    }

    const clearAgentTraits = () => {
        setTraitsList({});
        setAgent(prevAgent => ({
            ...prevAgent,
            traits: {} // Clear traits entirely
        }));
    };




    // ----------------------------
    // useEffect #1: Load from localStorage
    // Runs ONLY once on mount ([])
    // will empty placeholders from the default agent
    // ----------------------------
    useEffect(() => {

        const storedAgent = localStorage.getItem(AGENT_KEY);
        if (storedAgent) {
            try {
                const parsed = JSON.parse(storedAgent);
                console.log('Loading agent from localStorage:', storedAgent);
                if (parsed && typeof parsed === "object") {
                    setAgent({
                        ...defaultAgent,
                        ...parsed,
                        traits: parsed.traits && typeof parsed.traits === "object"
                            ? parsed.traits
                            : {}
                    });
                }
            } catch {
                //corrupted JSON: return to default
                setAgent(defaultAgent)
            }
        } else {
            setAgent(defaultAgent)
        }
    }, []); // Empty dependency array = run once when component mounts

    // 2. ✅ Trigger fetch manually when clicking the button
    const handleGenerate = () => {
        if (!prompt) return;

        setLoading(true);
        fetch("/api/generate-legend", {
            method: "POST",
            body: JSON.stringify({ prompt }),
        })
            .then((res) => res.json())
            .then((data) => {
                setLegend(data.output); // store result
            })
            .finally(() => setLoading(false));
    }
    // ----------------------------
    // useEffect #2: Save to localStorage whenever `agent` changes,
    //except for first render when default agent gets created
    // Runs on initial mount AND on every `agent` state update
    // ----------------------------
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; //skips the first save
        }
        console.log('Saving agent to localStorage:', agent);
        localStorage.setItem(AGENT_KEY, JSON.stringify(agent));
    }, [agent]); // Dependency = agent

    // ----------------------------
    // Render UI
    // ----------------------------
    return (
        <>
            {/* Display agent basic info */}
            <div>
                {Object.entries(defaultAgent).map(([key, value], index, arr) => (
                    (index < arr.length - 1) && (
                        <div key={key}>
                            <p className="inline font-oxanium">{capitalize(key)}: </p>
                            <p className="inline font-oxanium">{capitalize(String(value))}</p>
                        </div>
                    )
                ))}
            </div>

            {/* Trait selection form */}
            <form onSubmit={addTraits}>
                <fieldset>
                    <legend>Choose traits for your custom agent</legend>
                    {Object.entries(agentTraits).map(([category, values], index, arr) => (
                        <label htmlFor={category} key={category} className='min-h-[20px] text-2xl inline-block'>
                            {capitalize(category)}
                            {index === arr.length - 1
                                ? (
                                    <ul>
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
                                )
                                : (
                                    <ul>
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
                                )
                            }
                        </label>
                    ))}
                </fieldset>
                <button type='submit' className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
                    Add Traits
                </button>
            </form>

            {/* Display chosen traits */}
            <div>
                {traitsList && Object.entries(traitsList).map(([cat, values]) => (
                    <div key={cat}>
                        <h3 className="inline font-oxanium">{capitalize(cat)}: </h3>
                        <ul className="inline font-oxanium">
                            {values.map(v => <li key={v}>{capitalize(v)}</li>)}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Clear button */}
            <button
                onClick={clearList}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
                Clear Selection
            </button>

            {/* Save to local storage */}
            <button
                onClick={saveAgent}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
                Save Agent
            </button>

            {/* Clear the instance in local storage */}
            <button
                onClick={clearAgentTraits}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
                Delete Agent Records
            </button>
            {/* Display custom agent instance */}
            <div>
                <p>{`Your new hire by the name of ${agent.name} was asigned the following traits:`}</p>
                {agent.traits && Object.entries(agent.traits).map(([cat, values]) => ( // no need to show empty arrays of traits
                    <div key={cat}>
                        <h3 className="inline font-oxanium">{capitalize(cat)}: </h3>
                        <ul className="inline font-oxanium">
                            {values.map(v => <li key={v}>{capitalize(v)}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
            {/* Display AI generated agent legend */}
            <LegendBuilderTransition prompt={prompt} />


        </>
    );
}
