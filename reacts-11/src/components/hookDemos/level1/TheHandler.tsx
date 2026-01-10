'use client'

/* now we woul like to actually asign these traits and preserve the new agent instance 
in the local storage */
import React, { useState, useEffect, useReducer } from 'react';
import traits from "../../../data/imaginariaAgentTraits.json"
import { capitalize } from '../../../lib/format';
import { Agent, Traits } from '@/types'
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

type Action =
    | { type: 'TOGGLE_CHECKBOX'; payload: { category: string, value: string, checked: boolean } }
    | { type: 'SELECT_RADIO'; payload: { category: string, value: string } }
    | { type: 'ADD_TRAITS'; }
    | { type: 'CLEAR_TRAITS'; }

function traitsReducer(state: State, action: Action) {
    switch (action.type) {
        case 'TOGGLE_CHECKBOX': {
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
                    languages: state.draftSelection.languages,
                    backgrounds: state.draftSelection.backgrounds,
                    martialArts: state.draftSelection.martialArts,
                    fieldRoles: state.draftSelection.fieldRoles,

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

    // ----------------------------
    // Event handlers for form changes
    // ----------------------------
    const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
        dispatch({
            type: 'TOGGLE_CHECKBOX',
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
            <TraitSelectionForm
                agentTraits={agentTraits}
                selectedTraits={state.draftSelection}
                onRadioChange={handleRadioChange}
                onCheckboxChange={handleCheckboxChange}
                onSubmit={addTraits}
            />


            {/* Display chosen traits */}
            <div>
                {state.committedSelection && Object.entries(state.committedSelection).map(([cat, values]) => (
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
