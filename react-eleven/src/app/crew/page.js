import HookCard from "@/components/HookCard"
import hooks from "../../data/hooks.json";


export default function CrewCardsPage() {

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Meet the Main Head Quarete Crew </h2>
                <h1 className="text-2xl font-bold tracking-tight bg-backgroundDark text-brand">Mighty {`React's`} 11: </h1>

                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                    {hooks.map((hook) => (
                        <HookCard key={hook.id} hook={hook} />
                    ))}
                </div>
            </div>

        </div>
    )
}
