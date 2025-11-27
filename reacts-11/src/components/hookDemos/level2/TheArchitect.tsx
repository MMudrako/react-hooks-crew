"use client";
import React, { useState, useEffect, useMemo } from 'react'
import { useArchitect } from "../../context/ArchitectContext";
import { Agent, Traits } from '@/types'
import { capitalize } from '@/lib/format';
import { LegendBuilderTransition } from '../AgentBuilder';
import traits from "../../../data/agentTraits.json"


const AGENT_KEY = "agentArchitect";
const PROMPT_KEY = "architectPrompt"
const traitsSelection: Traits = traits;

export default function TheArchitect() {
  const { defaultAgent, saveAgent, savePrompt } = useArchitect();

  // 1. Load agent from localStorage runs only once on mount just like useEffect
  const [agent, setAgent] = useState<Agent>(() => {
    const stored = localStorage.getItem(AGENT_KEY);
    return stored ? JSON.parse(stored) : defaultAgent;
  });

  // Stores the trait selections from form inputs before committing to agent
  const [selectedTraits, setSelectedTraits] = useState<Record<string, string[]>>({});
  //Stores user's final selection of the custom traits list
  const [traitsList, setTraitsList] = useState<Traits>({});
  const [prompt, setPrompt] = useState<string>("");

  // 2. Save agent to localStorage (skip first render)
  useEffect(() => {
    saveAgent(AGENT_KEY, agent);
  }, [agent, saveAgent]);

  // 3. Memoized prompt from agent traits   
  const promptMemo = useMemo(() => {
    return savePrompt(PROMPT_KEY, agent);

  }, [savePrompt, agent]);

  // ----------------------------
  // Event handlers for 
  // form changes
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

  const clearListButton = () => {
    // Reset selections 
    setSelectedTraits({});
    setTraitsList({});

  }

  const saveAgentButton = () => {
    // Update agent with current selectedTraits
    setAgent(prevAgent => ({
      ...prevAgent,
      traits: selectedTraits
    }));
  }

  const clearAgentTraitsButton = () => {
    setTraitsList({});
    setAgent(prevAgent => ({
      ...prevAgent,
      traits: {} // Clear traits entirely
    }));
  };




  return (
    <>
      <h2>Advanced useContext Demo</h2>
      <p>Agent: {agent.name} ({agent.status})</p>

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
          {Object.entries(traitsSelection).map(([category, values], index, arr) => (
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
        onClick={clearListButton}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        Clear Selection
      </button>

      {/* Save to local storage */}
      <button
        onClick={saveAgentButton}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        Save Agent
      </button>

      {/* Clear the instance in local storage */}
      <button
        onClick={clearAgentTraitsButton}
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
      <button
        onClick={() => setPrompt(promptMemo)}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
        Display Prompt
      </button>
      <p>{prompt}</p>

      {/* Display AI generated agent legend */}
      <LegendBuilderTransition prompt={prompt} />

    </>
  );
}
