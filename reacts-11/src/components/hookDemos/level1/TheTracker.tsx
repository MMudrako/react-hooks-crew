'use client'

/* now we woul like to actually asign these traits and preserve the new agent instance 
in the local storage */
import React, { useState, useEffect } from 'react';
import traits from "../../../data/imaginariaAgentTraits.json"
import { capitalize } from '../../../lib/format';
import { Agent, Traits } from '@/types'
import { createDefaultAgent } from '../../../lib/utils';

// create a default agent with empty traits
const defaultAgent = createDefaultAgent();

// The traits data comes from a JSON file in the data directory
const agentTraits: Traits = traits;

// LocalStorage key MUST be a string
const AGENT_KEY = 'agent';

export default function TheTracker() {
    // Stores the trait selections from form inputs before committing to agent
    const [selectedTraits, setSelectedTraits] = useState<Record<string, string[]>>({});


    //Stores user's final selection of the custom traits list
    const [traitsList, setTraitsList] = useState<Traits>({});

    // Stores the actual agent object, including traits
    const [agent, setAgent] = useState<Agent>(defaultAgent);

    // ----------------------------
    // Event handlers for form changes
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
    // ----------------------------
    useEffect(() => {
        const storedAgent = localStorage.getItem(AGENT_KEY);
        if (storedAgent) {
            console.log('Loading agent from localStorage:', storedAgent);
            setAgent(JSON.parse(storedAgent));
        }
    }, []); // Empty dependency array = run once when component mounts

    // ----------------------------
    // useEffect #2: Save to localStorage whenever `agent` changes
    // Runs on initial mount AND on every `agent` state update
    // ----------------------------
    useEffect(() => {
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
                {agent.traits && Object.entries(agent.traits).map(([cat, values]) => (
                    <div key={cat}>
                        <h3 className="inline font-oxanium">{capitalize(cat)}: </h3>
                        <ul className="inline font-oxanium">
                            {values.map(v => <li key={v}>{capitalize(v)}</li>)}
                        </ul>
                    </div>
                ))}
            </div>


        </>
    );
}
