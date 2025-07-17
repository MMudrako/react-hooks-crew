import HookProfile from "@/components/HookProfile"
import hooks from "../../../data/hooks.json"


export default async function HookProfilePage(props) {

    const params = await props.params;
    const hookId = params.id;

    //console.log("params", params);
    //console.log("hookId", hookId);

    const hook = hooks.find((h) => h.id === hookId)
    console.log("hook", hook);
    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

            <HookProfile key={hook.id} hook={hook} />


        </main>
    )



}