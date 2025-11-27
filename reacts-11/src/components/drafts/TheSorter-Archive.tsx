'use client'
// This directive is specific to Next.js 13+ — it marks this component 
// as a Client Component (can use hooks, browser APIs, etc.).


/* in this demo there are two state that watch the same lists state from the first glance and may appear 
redundant, but stay with me is for demonstration purposes 
the first state is needed to watch any ongoing selection changes that user can make 
the second is to store the finalized list 
in this demo we create an agent instance and user can select custom properties for this instance - agent traits
which will be displayed at the bottom of ui */



//redo to meet the new schema and ui
/* function reducer(agent: Agent, action: Action) {

    const { type } = action;
    switch(type) {
        case "handleCheckBoxChange": {

        } 
        case "handleRadioChange": {

        }
        case "addTraits": {

        }
        case "clearList": {

        }
        default: 
            return agent;
    } 
} */

import React, { useState, useReducer } from 'react';

import missions from "../../data/mission.json"
import regions from "../../data/regionLanguages.json"

type Country = {
    id: string,
    name: string,
    language: string,
    color: string,

}

type Mission = {
    missionId: string,
    missionName: string,
    backstory: string,
    regions: string[],
    countries: Country[],

    requiredRoles: string[]
}

// --------------------
// Utilities to create an agent
// --------------------
function generateId() {
    return Math.floor(Math.random() * 1e8);
}




export default function TheSorter() {
    const [missionId, setMissionId] = useState("M-001");
    const missionNames = ["Operation Desert Veil", "Operation Jade Circuit", "Operation Northern Echo", "Operation Jungle Call", "Operation Crimson Veins"]
    const [activeTab, setActiveTab] = useState(0);
    const [hasChosenMission, setHasChosenMission] = useState(false)
    const mission = missions.find(m => m.missionId === missionId) || missions[0];
    const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
    const [countriesList, setCountriesList] = useState<string[]>([]);
    const [activeMission, setActiveMission] = useState<Mission>(mission)

    const missionEnum = [...missions.entries()];

    // ----------------------------
    // Event handlers for form changes
    // ----------------------------
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setSelectedCountries(prevCountries => ({
            ...prevCountries,
            checked
            ? [...prevCountries, value] // Add if checked
                : (prevCountries || []).filter(v => v !== value) // Remove if unchecked
}));
    };


// --------------------
// UI
// --------------------
return (
    <>
        {/* Display mission selection */}
        <div className="bg-white flex flex-col-2 gap-8 p-6 text-sm text-black">
            <div className="flex-2 overflow-y-auto px-5 py-6 sm-px-6">

                {missionNames.map((mName, idx) => (
                    <div key={mName} className="bg-black text-amber-600 p-3">
                        <button
                            key={mName}
                            disabled={idx > activeTab + 1}
                            onClick={() => {
                                setActiveTab(idx);
                                setMissionId(missionEnum[idx][1].missionId);
                                setHasChosenMission(true);
                                setActiveMission(missionEnum[idx][1]);
                            }}
                            className={idx === activeTab ? "active" : ""}>
                            {mName}
                        </button>



                    </div>
                ))}

                <h1>mission: {mission.missionName}</h1>

                <h2>color: {mission.color}</h2>

                {hasChosenMission && (<>

                    <h2>Country selection stage</h2>
                    {regions.map((r, i) => (
                        mission.regions.includes(r.name) &&

                        <ul>
                            {r.countries.map((country, index) => (
                                <li key={index} className='text-sm text-gray-800' >
                                    <input type='checkbox'
                                        value={country}
                                        onChange={ }
                                   </li>
                            ))}
                        </ul>



                    ))

                    }
                    )
                          
                            
                                    
                        }
                </>)}
                <h2>Required Roles for this mission: </h2>
                <ul>
                    {mission.requiredRoles.map((r, i) => (
                        <li key={r + i} className='text-sm text-gray-800'>
                            {r}
                        </li>

                    ))}
                </ul>



            </div>
        </div>
    </>
)
}
