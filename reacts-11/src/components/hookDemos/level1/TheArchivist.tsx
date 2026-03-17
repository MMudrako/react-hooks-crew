'use client'

/**
 * useRef Demo — DOM access & side-effect control
 *
 * This component demonstrates how `useRef` can be used to:
 * - Access a rendered DOM element for animation (SVG frame)
 * - Store mutable values like timer IDs without causing re-renders
 *
 * The agent is built declaratively using reducer state,
 * but visual feedback (animations, timers) is handled imperatively
 * through refs — keeping React state predictable and UI responsive.
 *
 * The main idea:
 * useRef is not for rendering data — it is for controlling things
 * that React does not need to track.
 */

import Image from 'next/image';
import React, { useState, useEffect, useReducer, useRef } from 'react';
import traits from "../../../data/imaginariaAgentTraits.json"
import { capitalize } from '../../../lib/format';
import { Agent, Traits } from '@/types'
import { createDefaultAgent } from '../../../lib/utils';
import { TraitSelectionForm } from '@/ui/TraitSelectionForm';
import IntakeFrame from '@/components/frames/intakeFrame.svg'

type State = {
    draftSelection: Record<string, string[]>,
    committedSelection: Traits,

}

// create a default agent with empty traits
const defaultAgent = createDefaultAgent();

const initialState: State = {
    draftSelection: {}, // instead of selectTraits state to store the user's selection from inputs before committing to the final list 
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

    const frameRef = useRef<HTMLDivElement>(null);

    const resetTimerRef = useRef<number | null>(null);


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

        //ref animation
        const frame = frameRef.current;
        if (!frame) return;
        frame.animate(
            [
                { transform: 'scale(1)', opacity: 1 },
                { transform: 'scale(1.05)', opacity: 0.9 },
                { transform: 'scale(1)', opacity: 1 }
            ],
            {
                duration: 300,
                easing: 'ease-out'
            }
        );
        if (resetTimerRef.current !== null) {
            clearTimeout(resetTimerRef.current);
        }

        resetTimerRef.current = window.setTimeout(() => {
            frame.style.transform = '';
            frame.style.opacity = ''
        }, 500);
        return () => clearTimeout(resetTimerRef.current!);
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

            {/* Clear the traits selections in local storage */}
            <button
                onClick={clearAgentTraits}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
                Reset Agent to Default
            </button>
            {/* Display custom agent instance */}
            < div className="grid grid-cols-[1fr_auto] gap-2" >
                <div className='plot pt-25 pl-3' >
                    {!Object.entries(agent.traits).some(([cat, values]) => values.length > 0)
                        &&
                        <>
                            <p>{`Your new hire by the name of ${agent.name} was asigned the following traits:`}</p>
                            {Object.entries(agent.traits).map(([cat, values]) => (
                                <div key={cat}>
                                    <h3 className="inline font-oxanium">{capitalize(cat)}: </h3>
                                    <ul className="inline font-oxanium">
                                        {values.map(v => <li key={v}>{capitalize(v)}</li>)}
                                    </ul>
                                </div>

                            ))}
                        </>
                    }
                </div>
                <div ref={frameRef} className="relative w-72 h-72 rounded-xl overflow-hidden">
                    <IntakeFrame className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none" />
                    <div className="absolute top-1/7 left-1/4 z-20 ">
                        <Image
                            className="rounded-full border-2 border-white"
                            alt="Field Agent Avatar"
                            src={`/fieldAvatars/agent-01.png`}
                            width={140}
                            height={170} />
                    </div>
                </div>
            </div>
            <div>

            </div>


        </>
    );
}
