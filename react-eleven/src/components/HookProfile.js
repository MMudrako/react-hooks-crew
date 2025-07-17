
import Image from 'next/image';
import { capitalize } from '@/lib/format';
import { RocketLaunchIcon } from '@heroicons/react/20/solid'


export default function HookProfile({ hook }) {

    for (const [key, value] of Object.entries(hook)) {
        console.log(`${key}: ${value}`);


    }

    return (

        <main className='main  ml-20'>
            <section className='top-section relative overflow-hidden'>
                <div className=' flex justify-center divider bg-foreground' >
                    <h1
                        className=' text-amber-50 font-oxanium'>
                        React Intelligence Department
                    </h1>
                </div>
                <div className="absolute z-10 inset-0 pointer-events-none flex items-center justify-center">
                    <span className=" uppercase border-4 border-red-700 px-4 rounded-sm text-6xl text-red-700 font-bold opacity-80 stamp-animate tracking-widest drop-shadow-md rotate-[20deg] ">
                        TOP SECRET
                    </span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                    <div className='plot pt-25 pl-3'>
                        {Object.entries(hook).map(([key, value]) => {
                            if (key === "icon" || key === "image" || key === "traits" || key === "featured") return null;
                            return (
                                <div key={key}>
                                    <p className="inline font-oxanium">
                                        {capitalize(key)}
                                        {': '}
                                    </p>
                                    <p className="inline font-oxanium">
                                        {capitalize(value)}</p>
                                </div>
                            )
                        }
                        )}
                    </div>
                    <Image
                        className="border border-black m-2"
                        alt="Hook Avatar"
                        src={`/hooksAvatars/${hook.id}.png`}
                        width={200}
                        height={100} />
                </div>

            </section>
            <section className='mid-section'>
                <div className=' flex justify-center divider bg-foreground' >
                    <h1 className=' text-amber-50 font-oxanium'>
                        Character Features
                    </h1>
                </div>
                <div className='plot pt-2 pl-3 m-5'>
                    <ol className='flex flex-wrap gap-2'>
                        {hook.traits.map((trait, index) => (
                            <li key={index}
                                className='flex-items-center gap-1 br-amber-200 px-2 py-1 rounded'>
                                <RocketLaunchIcon className='size-6 text-foreground' />
                                <span>{trait}</span>
                            </li>
                        )
                        )}

                    </ol>
                </div>

            </section>
            <section className='bottom-section'>
                <div className=' flex justify-center divider bg-foreground' >
                    <h1 className=' text-amber-50 font-oxanium'>
                        Legend
                    </h1>
                </div>
                <div className='grid grid-cols-2 gap-0.5'>
                    <div className='mission border border-foreground'>
                        <p className="mb-4">
                            Mission Briefing
                            Lorem ipsum dolor sit amet consectetur adipiscing elit.
                            Quisque faucibus ex sapien vitae pellentesque sem placerat.
                            In id cursus mi pretium tellus duis convallis. Tempus leo eu
                            aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
                            nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer
                            nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                            Ad litora torquent per conubia nostra inceptos himenaeos.
                        </p>
                    </div>
                    <div className='output border border-foreground  '>
                        <p>
                            Demo Output
                            Lorem ipsum dolor sit amet consectetur adipiscing elit.
                            Quisque faucibus ex sapien vitae pellentesque sem placerat.
                            In id cursus mi pretium tellus duis convallis. Tempus leo eu
                            aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
                            nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                            integer nunc posuere. Ut hendrerit semper vel class aptent tacit
                            sociosqu. Ad litora torquent per conubia nostra inceptos
                            himenaeos.
                        </p>
                    </div>

                </div>
            </section>

        </main>


    )
}

