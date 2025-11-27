"use client";
import React, { createContext, useCallback, useContext } from "react";
import { Agent, Traits } from '@/types'
// ----------------------------
// Type definitions
// ----------------------------

type ArchitectContextType = {
  defaultAgent: Agent;
  saveAgent: (key: string, agent: Agent) => void;
  savePrompt: (key: string, agent: Agent) => string;

};


// ----------------------------
// Create Context
// ----------------------------
const ArchitectContext = createContext<ArchitectContextType | undefined>(undefined);

//const CreateAgentContext = createContext<AgentContextType | null>(null);


// ----------------------------
// Provider Component
// ----------------------------
export default function ArchitectProvider({ children }: { children: React.ReactNode }) {


  // 1. Default agent factory
  const defaultAgent = () => {
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

  const defaultAgentObj = defaultAgent();

  // 2. Save agent to localStorage (skip first render)
  function saveAgent(key: string, agent: Agent) {
    localStorage.setItem(key, JSON.stringify(agent));
  };


  // 3. Generate and Save prompt from agent traits
  const savePrompt = useCallback((key: string, agent: Agent) => {
    console.log("Building prompt...");
    const { regions, backgrounds, languages, martialArts, fieldRoles } = agent.traits ?? {};

    const prompt = `
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
    `
    localStorage.setItem(key, JSON.stringify(prompt));
    return prompt;
  }, []);



  return (
    <ArchitectContext.Provider
      value={{
        defaultAgent: defaultAgentObj,
        saveAgent,
        savePrompt

      }}
    >
      {children}
    </ArchitectContext.Provider>
  );
}



// Custom hook for Consumers
/* export function useAgentContext() {
  const AgentContext = useContext(CreateAgentContext);
  if (!AgentContext) throw new Error("useAgent must be used within AgentProvider");
  return AgentContext;
}
 */

// ----------------------------
// Custom Hook for Consumers
// ----------------------------
export function useArchitect() {
  const context = useContext(ArchitectContext);
  if (!context) {
    throw new Error("useArchitect must be used within ArchitectProvider");
  }
  return context;
}
