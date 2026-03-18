'use client'

/* now we woul like to actually asign these traits and preserve the new agent instance 
in the local storage */
import React, { useState, useEffect, useReducer } from 'react';
import traits from "../../../data/imaginariaAgentTraits.json"
import { capitalize } from '../../../lib/format';
import { Agent, Traits, Action } from '@/types'
import { createDefaultAgent } from '../../../lib/utils';
import { TraitSelectionForm } from '@/ui/TraitSelectionForm';

type State = {
    draftSelection: Record<string, string[]>,
    committedSelection: Traits,

}

// create a default agent with empty traits
const defaultAgent = createDefaultAgent();

const initialState: State = {
    draftSelection: {}, // instead of selecteTraits state to store the user's selection from inputs before committing to the final list 
    committedSelection: {
        languages: [],
        backgrounds: [],
        martialArts: [],
        fieldRoles: []
    },// instead of traitsList state to store final selection of traits

}

export function traitsReducer(state: State, action: Action) {
    switch (action.type) {
        case 'TOGGLE_SCROL_SELECT': {
            const { category, value, checked } = action.payload;
            const current = state.draftSelection[category] ?? []
            return {
                ...state,
                draftSelection: {
                    ...state.draftSelection,
                    [category]: checked
                        ? [...current, value] // Add if checked
                        : current.filter((v) => v !== value) // Remove if unchecked
                },


            }
        }
        case 'SELECT_RADIO': {
            const { category, value } = action.payload;
            return {
                ...state,
                draftSelection: {
                    ...state.draftSelection,
                    [category]: [value]
                }, // Add if checked


            }
        }
        case 'ADD_TRAITS': {
            return {
                ...state,
                committedSelection: {
                    languages: state.draftSelection.languages ? state.draftSelection.languages : [""],
                    backgrounds: state.draftSelection.backgrounds ? state.draftSelection.backgrounds : [""],
                    martialArts: state.draftSelection.martialArts ? state.draftSelection.martialArts : [""],
                    fieldRoles: state.draftSelection.fieldRoles ? state.draftSelection.fieldRoles : [""],

                },

            }
        }
        case 'CLEAR_TRAITS': {
            return {
                ...state,
                draftSelection: {},
                committedSelection: {},

            };
        }

        default:
            return state;
    }
}
// The traits data comes from a JSON file in the data directory
const agentTraits: Traits = traits;

// LocalStorage key MUST be a string
const AGENT_KEY = 'agent';

export default function TheHandler() {

    // Stores the actual agent object, including traits
    const [agent, setAgent] = useState<Agent>(defaultAgent);

    const [state, dispatch] = useReducer(traitsReducer, initialState);

    const [pendingDescription, setPendingDescription] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    // ----------------------------
    // Event handlers for form changes
    // ----------------------------
    const handleScrolSelectChange = (category: string, value: string, checked: boolean) => {
        dispatch({
            type: 'TOGGLE_SCROL_SELECT',
            payload: { category, value, checked }
        })

    };

    const handleRadioChange = (category: string, value: string) => {
        dispatch({
            type: "SELECT_RADIO",
            payload: { category, value }
        });
    };

    const addTraits = () => {
        // Commit selected traits after form submission
        dispatch({
            type: "ADD_TRAITS",

        });
    };

    const clearList = () => {
        // Reset selections 
        dispatch({
            type: "CLEAR_TRAITS"
        })


    }

    const saveAgent = () => {

        // Update agent with current selectedTraits
        setAgent(prevAgent => ({
            ...prevAgent,
            traits: state.committedSelection
        }));
    }

    const clearAgentTraits = () => {
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

    useEffect(() => {

        console.log("Building pending description...");

        const { languages, backgrounds, martialArts, fieldRoles } = state.committedSelection;

        const description = `
        Agent Configuration Console — Pending Installation


        The following traits are queued for installation into the new operative's profile.

        ${fieldRoles?.length
                ? `• Field specialization modules detected: ${fieldRoles?.join(", ")}.`
                : `• Field specialization module: not yet assigned.`}

        ${backgrounds?.length
                ? `• Background data recovered: ${backgrounds.join(", ")} origins.`
                : `• Background data: incomplete.`}

        ${languages?.length
                ? `• Linguistic packages available: ${languages.join(", ")}.`
                : `• Linguistic capability: none detected.`}

        ${martialArts?.length
                ? `• Combat training protocols: ${martialArts.join(", ")}.`
                : `• Combat training: no martial discipline installed.`}
        `;

        setPendingDescription(description);

    }, [state]);

    useEffect(() => {

        console.log("Building  new agent traits configuration...");

        const { languages, backgrounds, martialArts, fieldRoles } = agent.traits ?? {};

        const description = `
        Agent Configuration Console 
        
        The installation of the following traits has been completed for ${agent.name} profile.

        ${fieldRoles?.length
                ? `• Field specialization modules detected: ${fieldRoles?.join(", ")}.`
                : `• Field specialization module: not yet assigned.`}

        ${backgrounds?.length
                ? `• Background data recovered: ${backgrounds.join(", ")} origins.`
                : `• Background data: incomplete.`}

        ${languages?.length
                ? `• Linguistic packages available: ${languages.join(", ")}.`
                : `• Linguistic capability: none detected.`}

        ${martialArts?.length
                ? `• Combat training protocols: ${martialArts.join(", ")}.`
                : `• Combat training: no martial discipline installed.`}
        `;

        setDescription(description);

    }, [agent]);
    // ----------------------------
    // useEffect #2: Save to localStorage whenever `agent` changes
    // Runs on initial mount AND on every `agent` state update
    // ----------------------------
    useEffect(() => {
        if (agent.traits !== defaultAgent.traits) {
            console.log('Saving agent to localStorage:', agent);
            localStorage.setItem(AGENT_KEY, JSON.stringify(agent));
        }

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
            <TraitSelectionForm
                agentTraits={agentTraits}
                selectedTraits={state.draftSelection}
                onRadioChange={handleRadioChange}
                onScrolSelectChange={handleScrolSelectChange}
                onSubmit={addTraits}
            />


            {/* Display chosen traits */}

            {state.committedSelection &&

                <div className="p-0.75 rounded-lg bg-gray-300 font-mono leading-2.5 whitespace-pre-line">
                    {pendingDescription}
                </div>

            }


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

                {agent.traits !== defaultAgent.traits &&
                    <div className="p-0.75 rounded-lg bg-gray-300 font-mono leading-2.5 whitespace-pre-line">
                        {description}
                    </div>
                }
            </div>

        </>
    );
}
