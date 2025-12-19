
import Image from 'next/image';
import { capitalize } from '../lib/format';
import TheKeeper from './hookDemos/level1/TheKeeper';
import TheTracker from './hookDemos/level1/TheTracker';
import hooksDetails from '../data/hooksDetails.json';
import TheArchivist from './hookDemos/level1/TheArchivist';
import TheArchitect from './hookDemos/level2/TheArchitect';
import ArchitectProvider from './context/ArchitectContext';
import TheMissionArchitect from './hookDemos/level1/TheMissionArchitect';
//import TheSorter from './drafts/TheSorter-Archive';
import { Hook } from "@/types"
import LegendBuilder from './hookDemos/AgentBuilder'; //draft component for refactoring other demo components

import TheMemoizer from './hookDemos/level1/TheMemoizer';
import TheMentor from './hookDemos/level1/TheMentor';
import TheDispatcher from './hookDemos/level1/TheDispatcher';
import TheStylist from './hookDemos/level2/TheStylist'

type HookId1 = 'useState' | 'useEffect' | 'useRef' | 'useContext-basic' | 'useMemo' | 'useCallback' | "useTransition" | "useReducer";
type HookId2 = 'useContext-advanced' | 'useLayoutEffect'
const level1DemoMap = {
    "useState": TheKeeper,
    "useEffect": TheTracker,
    "useRef": TheArchivist,
    "useContext-basic": TheMissionArchitect,
    "useMemo": TheMemoizer,
    "useCallback": TheMentor,
    "useTransition": TheDispatcher,
    //"useReducer": TheSorter

}

const level2DemoMap = {
    "useContext-advanced": TheArchitect,
    "useLayoutEffect": TheStylist


}
export default function HookProfile({ hook }: { hook: Hook }) {

    for (const [key, value] of Object.entries(hook)) {
        console.log(`${key}: ${value}`);


    }
    const profile = hooksDetails.find(entry => entry.id === hook.id);
    const hookId1 = hook.id as HookId1;
    const hookId2 = hook.id as HookId2;
    const DemoComponentLevel1 = level1DemoMap[hookId1] ?? null;
    const DemoComponentLevel2 = level2DemoMap[hookId2] ?? null;
    return (

        <main className='main  ml-20' >
            <section className='top-section relative overflow-hidden' >
                <div className=' flex justify-center divider bg-foreground' >
                    <h1
                        className=' text-amber-50 font-oxanium' >
                        React Intelligence Department
                    </h1>
                </div>
                < div className="absolute z-10 inset-0 pointer-events-none flex items-center justify-center" >
                    <span className=" uppercase border-4 border-red-700 px-4 rounded-sm text-6xl text-red-700 font-bold opacity-80 stamp-animate tracking-widest drop-shadow-md rotate-[20deg] " >
                        TOP SECRET
                    </span>
                </div>
                < div className="grid grid-cols-[1fr_auto] gap-2" >
                    <div className='plot pt-25 pl-3' >
                        {
                            Object.entries(hook).map(([key, value]) => {
                                if (key === "icon" || key === "image" || key === "traits" || key === "featured") return null;
                                return (
                                    <div key={key} >
                                        <p className="inline font-oxanium" >
                                            {capitalize(key)}
                                            {': '}
                                        </p>
                                        < p className="inline font-oxanium" >
                                            {capitalize(value)} </p>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                    < Image
                        className="border border-black m-2"
                        alt="Hook Avatar"
                        src={`/hooksAvatars/${hook.id}.png`}
                        width={200}
                        height={100} />
                </div>

            </section>
            < section className='mid-section' >
                <div className=' flex justify-center divider bg-foreground' >
                    <h1 className=' text-amber-50 font-oxanium' >
                        Traits Markers
                    </h1>
                </div>
                < div className='plot pt-2 pl-3 m-5' >
                    <ol className='flex flex-wrap gap-2' >
                        {
                            hook.traits.map((trait, index) => (
                                <li key={index}
                                    className='flex-items-center gap-1 br-amber-200 px-2 py-1 rounded' >
                                    <span className='size-6 text-foreground' > {hook.icon}{trait} </span>
                                </li>
                            )
                            )
                        }

                    </ol>
                </div>
                < div className=' flex justify-center divider bg-foreground' >
                    <h1 className=' text-amber-50 font-oxanium' >
                        Legend
                    </h1>
                </div>
                < p className="mt-2 text-base text-foreground" > {profile?.legend} </p>

            </section>
            < section className='bottom-section' >
                <div className=' flex justify-center divider bg-foreground' >

                </div>
                < div className='grid grid-cols-2 gap-0.5' >
                    <div className='mission border border-foreground' >
                        <h3>
                            Mission Briefing

                        </h3>
                        < p className="mt-2 text-base text-foreground" > {profile?.missionBriefing} </p>

                    </div>
                    < div className='output border border-foreground  ' >
                        <h3>Ops Panel tabs Strategy and Visual Evidence and will be here </h3>
                        {DemoComponentLevel1 && !DemoComponentLevel2 &&
                            (< DemoComponentLevel1 />

                            )}
                        {DemoComponentLevel2 && (
                            <ArchitectProvider>
                                <DemoComponentLevel2 />
                            </ArchitectProvider>
                        )}


                    </div>

                </div>
            </section>

        </main>


    )
}

