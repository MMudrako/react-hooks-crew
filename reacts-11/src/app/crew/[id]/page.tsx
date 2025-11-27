import HookProfile from "@/components/HookProfile";
import hooks from "../../../data/hooks.json";
import { Hook } from "@/types"

// Define type for page props
type PageProps = {
    params: {
        id: string;
    };
};

// Cast hooks JSON to Hook[]
const hooksTyped = hooks as Hook[];

export default async function HookProfilePage({ params }: PageProps) {
    // Find the matching hook by id
    const { id } = await params;
    const hook = hooksTyped.find((h) => h.id === id);

    if (!hook) {
        return <div>Hook not found</div>;
    }

    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            {/* Pass the found hook object to HookProfile */}
            <HookProfile key={hook.id} hook={hook} />
        </main>
    );
}
