import HookCard from "../../components/HookCard"
import hooks from "../../data/hooks.json";


export default function CrewCardsPage() {

    const level1Hooks = hooks.filter(h => h.level === 1);
    const level2Hooks = hooks.filter(h => h.level === 2);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-8 py-16">
                <h2 className="text-2xl font-bold text-foreground">
                    Meet the Main Headquarters Crew
                </h2>

                <h3 className="text-xl font-bold mt-8 text-brand">
                    Level 1 – Independent Agents
                </h3>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {level1Hooks.map(hook => (
                        <HookCard key={hook.id} hook={hook} />
                    ))}
                </div>

                <h3 className="text-xl font-bold mt-12 text-brand">
                    Level 2 – Crew Missions
                </h3>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {level2Hooks.map(hook => (
                        <HookCard key={hook.id} hook={hook} />
                    ))}
                </div>
            </div>
        </div>
    );
}