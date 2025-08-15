'use client';
import { useState } from 'react';
import { MissionContext } from '../context/MissionContext';
import AgentCard from '../agents/AgentCard';

export interface Mission {
    missionMode: string
}
export default function TheArchitect() {
    const [mission, setMission] = useState<Mission>({ missionMode: 'stealth' });
    const { missionMode } = mission;

    const updateMission = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setMission({ missionMode: value })
    }
    return (
        //Wraps the app to provide shared data.
        <MissionContext.Provider value={mission}>
            <div className='space-y-4'>
                <h2 className='text-lg font-bold'>Mission Mode: {missionMode}</h2>
                <select
                    value={missionMode}
                    onChange={updateMission}
                    className='border p-2'
                >
                    <option value={"stealth"}>Stealth</option>
                    <option value={"infiltration"}>Infiltration</option>
                </select>

                <AgentCard name="Shadowfox" avatar="/fieldAvatars/agent-01.png" />
                <AgentCard name="Ivyblade" avatar="/fieldAvatars/agent-02.png" />
            </div>

        </MissionContext.Provider>
    )
}