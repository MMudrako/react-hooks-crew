"use client";
import React, { useState, createContext, useContext, useMemo, useRef, useEffect } from "react";

// ----------------------------
// Type definitions
// ----------------------------

type Traits = {
  regions?: string[];
  backgrounds?: string[];
  languages?: string[];
  martialArts?: string[];
  fieldRoles?: string[];
};

type Agent = {
  id: number;
  name: string;
  specialty: string;
  status: "Untrained" | "Trained" | "Active" | "Retired";
  assignedBy: string;
  mode: string;
  icon: string;
  traits?: Traits;
};


type AgentContextType = {
  agent: Agent;
  setAgent: React.Dispatch<React.SetStateAction<Agent>>;
  selectedTraits: Record<string, string[]>;
  setSelectedTraits: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  traitsList: Traits;
  setTraitsList: React.Dispatch<React.SetStateAction<Traits>>;
  legend: string;
  setLegend: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleGenerate: () => void;
  clearAgentTraits: () => void;
};

const AGENT_KEY = "agent";

// ----------------------------
// Default agent factory
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
    traits: {}
  };
}

const defaultAgent = createDefaultAgent();


// ----------------------------
// Create Context
// ----------------------------
const AgentContext = createContext<AgentContextType | undefined>(undefined);

//const CreateAgentContext = createContext<AgentContextType | null>(null);


// ----------------------------
// Provider Component
// ----------------------------
export default function AgentProvider({ children }: { children: React.ReactNode }) {

  const [agent, setAgent] = useState<Agent>(defaultAgent);
  const [selectedTraits, setSelectedTraits] = useState<Record<string, string[]>>({});
  const [traitsList, setTraitsList] = useState<Traits>({});
  const [legend, setLegend] = useState("");
  const [loading, setLoading] = useState(false);

  const isFirstRender = useRef(true);

  // 1. Load agent from localStorage
  useEffect(() => {
    const storedAgent = localStorage.getItem(AGENT_KEY);
    if (storedAgent) {
      try {
        const parsed = JSON.parse(storedAgent);
        setAgent({ ...defaultAgent, ...parsed });
      } catch {
        setAgent(defaultAgent);
      }
    }
  }, []);

  // 2. Save agent to localStorage (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem(AGENT_KEY, JSON.stringify(agent));
  }, [agent]);

  // 3. Memoized prompt from agent traits
  const prompt = useMemo(() => {
    const { traits } = agent;
    if (!traits) return "";

    return `
      Write a heroic legend about an agent:
      Name: ${agent.name}
      Specialty: ${agent.specialty}
      Status: ${agent.status}
      Assigned By: ${agent.assignedBy}
      Mode: ${agent.mode}

      Regions: ${traits.regions?.join(", ") || "None"}
      Roles: ${traits.fieldRoles?.join(", ") || "None"}
      Backgrounds: ${traits.backgrounds?.join(", ") || "Unknown"}
      Languages: ${traits.languages?.join(", ") || "Unknown"}
      Martial Arts: ${traits.martialArts?.join(", ") || "None"}
    `;
  }, [agent]);

  // 4. API call to generate legend
  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-legend", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setLegend(data.output);
    } finally {
      setLoading(false);
    }
  };

  const clearAgentTraits = () => {
    setTraitsList({});
    setAgent((prev) => ({ ...prev, traits: {} }));
  };

  return (
    <AgentContext.Provider
      value={{
        agent,
        setAgent,
        selectedTraits,
        setSelectedTraits,
        traitsList,
        setTraitsList,
        legend,
        setLegend,
        loading,
        handleGenerate,
        clearAgentTraits
      }}
    >
      {children}
    </AgentContext.Provider>
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
