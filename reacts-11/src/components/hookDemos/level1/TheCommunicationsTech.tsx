'use client'


import { useState, useMemo, useDeferredValue } from 'react';

import { Agent } from '@/types'
import { generateAgents, generateAgentsByRegion } from '../../../lib/utils';

type SearchResultsProps = {
    agents: Agent[]
    query: string
}
export function SearchResults({ agents, query }: SearchResultsProps) {


    const filtered: Agent[] = useMemo(() => {



        return agents.filter(a =>
            a.name.toLowerCase().includes(query.toLowerCase())
        )

    }, [agents, query]);

    return (
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
    );
}





export default function TheCommunicationsTech() {

    const [query, setQuery] = useState('');
    const [secondQuery, setSecondQuery] = useState('')

    const deferredQuery = useDeferredValue(secondQuery);

    //instantiate and memoize a dataset of agents for search demonstration
    const Agents = useMemo(() => generateAgents(3200), []);


    const NordicAgents = useMemo(() => generateAgentsByRegion("Northlands", 3500), []);
    const MidlandAgents = useMemo(() => generateAgentsByRegion("Midlands", 3500), []);


    //console.table(Agents.slice(0, 30));
    console.table(MidlandAgents.slice(0, 30));

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


                    <SearchResults agents={Agents} query={query} />


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
                        <SearchResults agents={Agents} query={deferredQuery} />

                    </div>




                </div>
            </div>




        </>
    );
}
