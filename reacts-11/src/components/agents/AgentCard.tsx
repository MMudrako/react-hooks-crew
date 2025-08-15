'use client';
import StealthFrame from '../frames/StealthFrame.svg';
import InfiltrationFrame from '../frames/InfiltrationFrame.svg';

import Image from 'next/image';
import { useMission } from '../context/MissionContext';

// --------------------
// Type Definitions
// --------------------
interface AgentCardType {
    name: string,
    avatar: string
}


//minimal number of props required to handle larger context sets<
export default function AgentCard({ name, avatar }: AgentCardType) {

    // Access missionMode from the Architect's master plan
    //as a chief agent code 'message' to launch which operation
    const mission = useMission();



    // Mock component (converted from SVG via SVGR)
    //the instruction list for each operation with respective code 'messages'
    const FrameComponent = {
        stealth: StealthFrame,
        infiltration: InfiltrationFrame,
    }[mission.missionMode] || StealthFrame;

    const themeStyles = {
        stealth: {
            text: 'text-gray-200',
            effect: 'animate-fade',
        },
        infiltration: {
            text: 'text-green-400',
            effect: 'animate-pulse',
        }
    }[mission.missionMode] || StealthFrame;

    const tool = {
        stealth: '🕶 Cloak',
        infiltration: '🎯 Thermal Scope'
    }[mission.missionMode] || '🧰 Tool Unavailable';

    return (
        <div className="relative w-72 h-72 rounded-xl overflow-hidden">
            {/* SVG Frame from context */}
            <FrameComponent className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none" />

            {/* PNG Avatar */}
            <div className="absolute top-2/5 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2">
                <Image
                    src={avatar}
                    alt={name}
                    width={126}
                    height={152}
                    className="rounded-full border-2 border-white"
                />
            </div>

            {/* Nameplate */}
            <div className=" absolute bottom-4 w-full z-30 text-center">
                <p className={`text-lg font-bold uppercase ${themeStyles.text}`}>{name}</p>
                <p className={` text-sm tracking-wide  ${themeStyles.text}`}>{mission.missionMode} mode</p>
                <p className={` text-sm tracking-wide  ${themeStyles.text}`}> {tool} Enabled</p>
            </div>

        </div>
    );
}