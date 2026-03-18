/* 
This demo illustrates how the useId hook solves common hydration issues
in reusable React components and server-side rendering environments.

Three scenarios are demonstrated:

1. Static hardcoded IDs → causes identity collisions when components are reused.
2. Randomly generated IDs → causes unstable identity and hydration mismatches.
3. useId hook → provides stable, unique IDs across renders and between
   server and client, solving both problems.
*/

'use client'
import { useState, useId } from "react";

//Case 1: static, hardcoded Ids
export const StaticIdEmailField = () => {
    return (
        <>

            <label htmlFor="email">Email with static ID: email</label>
            <input
                id="email"
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
                " />
        </>
    );
};

//Case 2: Randomly Generated Ids
export function RandomIdEmailField() {
    const [randomId, setRandomId] = useState<string>(Math.random().toString())
    const [Ids, setIds] = useState<string[]>([]);
    const isEmpty = Ids.length <= 1;
    const isStable = Ids.length > 1 && Ids.every(id => id === Ids[0])
    return (
        <>
            <h3 className="font-oxanium text-lg mb-3 text-emerald-400">
                CASE 2: UNSTABLE IDENTITY
            </h3>
            <label htmlFor={randomId}>Email with Randomly Generated ID: {randomId} </label>
            <input
                id={randomId}
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
            />
            <button
                onClick={() => {
                    setIds([...Ids, randomId])
                    setRandomId(Math.random().toString())
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
            >
                Trigger re-render
            </button>
            <h4 className="font-oxanium text-lg mb-3 text-emerald-400">
                IDENTITY LOG:
            </h4>
            <ul>
                {Ids.map((id, i) => <li key={i}> {id}</li>)}

            </ul>
            {!isEmpty && (<h4 className="font-oxanium text-lg mb-3 text-emerald-400">
                STATUS: {isStable ? "STABLE" : "UNSTABLE"}
            </h4>)}
        </>
    )
}

//case 3: useId hook, which gauarantees unique Id accross renders,
//  and on both sides (client & server)
export function HookGeneratedIdEmailField() {
    const uniqueId = useId();
    const [Ids, setIds] = useState<string[]>([]);
    const isEmpty = Ids.length <= 1;
    const isStable = Ids.length > 1 && Ids.every(id => id === Ids[0])
    return (
        <>
            <h3 className="font-oxanium text-lg mb-3 text-emerald-400">
                CASE 3: ARCHIVIST DEPLOYED - STABLE IDENTITY
            </h3>
            <label htmlFor={uniqueId}>Field with useId hook</label>
            <input
                id={uniqueId}
                aria-describedby={`${uniqueId}-hint`}
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
            />
            <button
                onClick={() => {
                    setIds([...Ids, uniqueId])

                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
            >
                Trigger re-render
            </button>
            <h4 className="font-oxanium text-lg mb-3 text-emerald-400">
                IDENTITY LOG:
            </h4>
            <ul>
                {Ids.map((id, i) => <li key={i}> {id}</li>)}

            </ul>
            {!isEmpty && (<h4 className="font-oxanium text-lg mb-3 text-emerald-400">
                STATUS: {isStable ? "STABLE" : "UNSTABLE"}
            </h4>)}
        </>
    )
}

export default function TheRegistrar() {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <>
            <div className="flex gap-5 p-5">
                <div className="grid grid-cols-1  bg-zinc-900 text-green-400 border border-zinc-700 rounded-xl shadow-xl p-4 ">
                    <div className="flex-col bg-zinc-700 rounded-lg shadow-lg gap-4 p-4">
                        <h3 className="font-oxanium text-lg mb-3 text-emerald-400">
                            CASE 1: IDENTITY COLLISION
                        </h3>
                        <StaticIdEmailField />
                        <button
                            onClick={() => setIsVisible(!isVisible)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                        >
                            Toggle another static email field
                        </button>

                        {isVisible && <>
                            <br></br>
                            <StaticIdEmailField />
                            <p> Click the second label.
                                Notice which field receives focus.</p>
                        </>}
                    </div>

                    <div className="flex-col bg-zinc-600 rounded-lg shadow-lg gap-4 p-4">
                        <RandomIdEmailField />
                    </div>

                    <div className="flex-col bg-zinc-700 rounded-lg shadow-lg gap-4 p-4">
                        <HookGeneratedIdEmailField />
                    </div>
                </div>

            </div>

        </>
    )
}