"use client";
import allAgents from "../../../data/fieldAgents.json"
import React, { useState, memo, useCallback } from 'react'

// ----------------------------
// Type definitions
// ----------------------------
type Agent = {
    id: number,
    name: string,
    specialty: string,
    status: string
    assignedBy: string,
    mode: string,
    icon: string,
}

// ----------------------------
// Type-assert JSON data
// ----------------------------
const typedAgents: Agent[] = allAgents;

// ----------------------------
// Child Component: TrainingSession
// ----------------------------
// This component displays the current session status and allows toggling ON/OFF.
// We wrap it in `memo` to prevent unnecessary re-renders if props don't change.
function TrainingSessionComponent(
    { session, ontraining, toggleSession }
        : { session: number, ontraining: boolean, toggleSession: () => void }) {

    console.log('Toggle Rendered'); // This shows when the child actually re-renders

    return (
        <div className="align-center mb-2 flex">
            <h1>
                {session === 0
                    ? "No session in progress" // Session 0 = nothing active
                    : ontraining
                        ? `Training session Number ${session} is ON`
                        : `Training session Number ${session} is over`}
            </h1>

            {/* Button toggles session state via parent callback */}
            <button
                className="bg-red-800 text-2xl mr-1 p-3 border-2 rounded-2xl"
                onClick={toggleSession}>
                End/Pause Session
            </button>
        </div>
    )
}

// Wrap child in memo() to stabilize renders
export const TrainingSession = memo(TrainingSessionComponent);

// ----------------------------
// Parent Component: TheMentor
// ----------------------------
export default function TheMentor() {

    // ----------------------------
    // State for session tracking
    // ----------------------------
    const [sessionCount, setSessionCount] = useState(0);  // Tracks current session number
    const [ontraining, setOntraining] = useState(false);  // Tracks if session is ON

    // ----------------------------
    // State for filtered agents
    // ----------------------------
    const [agents, setAgents] = useState<Agent[]>([]);

    // ----------------------------
    // Filter agents who are in training
    // ----------------------------
    const compileTrainingList = () => {
        const filteredAgents = typedAgents.filter((agent) =>
            agent.status === "InTraining");
        setAgents(filteredAgents);
        // Note: this does NOT affect TrainingSession child re-render
    }

    // ----------------------------
    // Start a new session
    // ----------------------------
    const startNewSession = () => {
        setSessionCount(c => c + 1); // Increment session
        setOntraining(true);          // Automatically start ON
    }

    // ----------------------------
    // Toggle session ON/OFF
    // ----------------------------
    // Wrapped in useCallback to ensure the function reference
    // does NOT change across parent re-renders. This allows
    // memoized child components to skip re-renders.
    const toggleSession = useCallback(() => {
        setOntraining(prev => !prev)
    }, []);

    // ----------------------------
    // Render
    // ----------------------------
    return (
        <>
            {/* Start new session button */}
            <button
                className="bg-blue-800 text-2xl mr-1 p-3 border-2 rounded-2xl"
                onClick={startNewSession}>
                Training sessions Number: {sessionCount}
            </button>

            {/* Show all agents */}
            <h2>All Agents List</h2>
            <ul>
                {allAgents.map((agent) => (
                    <li key={agent.name}>{agent.name}</li>
                ))}
            </ul>

            {/* Compile attendance sheet */}
            <button
                className="bg-blue-800 text-2xl mr-1 p-3 border-2 rounded-2xl"
                onClick={compileTrainingList}>
                Compile Attendance Sheet
            </button>

            {/* Conditionally show training list */}
            {agents.length !== allAgents.length
                ? (
                    <>
                        <h2>The List of Agents in Training:</h2>
                        <ul>
                            {agents.length < 4 && agents.map((agent) => (
                                <li key={agent.name}>{agent.name}</li>
                            ))}
                        </ul>
                    </>
                )
                : (<p>All agents are in training</p>)
            }

            {/* Render memoized child component */}
            <TrainingSession
                session={sessionCount}
                ontraining={ontraining}
                toggleSession={toggleSession}
            />
        </>
    )
}
