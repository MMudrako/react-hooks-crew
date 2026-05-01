'use client'


import { useState, useMemo, useDeferredValue, useEffect } from 'react';

import { Agent } from '@/types'
import { generateAgentsByRegion } from '../../../lib/utils';

type SearchResultsProps = {
    agents: Agent[]
    query: string
}
export function SearchResults({ agents, query }: SearchResultsProps) {


    const filtered: Agent[] = useMemo(() => {


        const q = query.toLowerCase();
        return agents.filter(a =>
            a.name.toLowerCase().includes(q)
        )

    }, [agents, query]);

    return (
        <>
            <ul>
                {filtered.length < agents.length && filtered.map(agent => (
                    <li key={agent.id}
                        className="
                                w-full
                                bg-black
                                border
                                 border-zinc-600
                                rounded
                                px-2
                                py-1
                                 text-green-400
                                font-mono
                                focus:outline-none
                                 focus:border-emerald-400
                                ">
                        {agent.name}
                    </li>
                ))}
            </ul>
            {filtered.length === 0 && <span className=' text-green-400'>No match was found...</span>}
        </>

    );
}





export default function TheCommunicationsTech() {

    const [query, setQuery] = useState('');
    const [secondQuery, setSecondQuery] = useState('')
    const [regionalAgents, setRegionalAgents] = useState<Agent[]>([]);

    const deferredQuery = useDeferredValue(secondQuery);

    //instantiate and memoize a dataset of agents for search demonstration
    //const Agents = useMemo(() => generateAgents(3200), []);


    useEffect(() => {

        const NordicAgents = generateAgentsByRegion("Northlands", 3500);
        const MidlandAgents = generateAgentsByRegion("Midlands", 3500);
        const SouthLandAgents = generateAgentsByRegion("Southlands", 3500);

        const all = NordicAgents.concat(MidlandAgents, SouthLandAgents);

        const ids = new Set(all.map(a => a.id));

        console.log("Total:", all.length);
        console.log("Unique:", ids.size);

        setRegionalAgents(all);





    }, [])




    //console.table(Agents.slice(0, 30));
    console.table(regionalAgents.slice(0, 30));
    console.log("number of generated agents in the whole region: ", regionalAgents.length)

    const isStale = secondQuery !== deferredQuery


    // ----------------------------
    // Render UI
    // ----------------------------
    return (
        <>
            {/* agent search */}
            < div className="grid grid-cols-2 gap-1" >
                <div className='w-[280px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-4' >
                    <h3 className="font-oxanium text-lg mb-3 text-emerald-400">
                        Communicator Console
                    </h3>

                    <input

                        type="text"
                        className="
                                w-full
                                bg-
                                border
                                 border-zinc-600
                                rounded
                                px-2
                                py-1
                                 text-green-400
                                font-mono
                                focus:outline-none
                                 focus:border-emerald-400
                                "
                        value={query} onChange={e => setQuery(e.target.value)} />


                    <SearchResults agents={regionalAgents} query={query} />


                </div>
                <div className='w-[280px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-4' >
                    <h3 className="font-oxanium text-lg mb-3 text-emerald-400">
                        Buffered Message
                    </h3>

                    <input
                        type="text"
                        className="
                                w-full
                                bg-black
                                border
                                 border-zinc-600
                                rounded
                                px-2
                                py-1
                                 text-green-400
                                font-mono
                                focus:outline-none
                                 focus:border-emerald-400
                                "

                        value={secondQuery} onChange={e => setSecondQuery(e.target.value)} />

                    {isStale && <span className=' text-green-400'>Stabilizing Transmission...</span>}

                    <div style={{
                        opacity: isStale ? 0.5 : 1,
                        transition: isStale ? 'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear'
                    }}  >
                        <SearchResults agents={regionalAgents} query={deferredQuery} />

                    </div>




                </div>
            </div>




        </>
    );
}
