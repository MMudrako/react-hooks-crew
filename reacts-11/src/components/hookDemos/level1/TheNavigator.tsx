"use client"

import { useRef, useState } from "react";
import FieldDeviceInput, {
    FieldDeviceHandle
} from "@/components/ImperativeNavigationDevice";

export default function TheNavigator() {
    const deviceRef = useRef<FieldDeviceHandle>(null);
    const [log, setLog] = useState<string[]>([]);

    const appendLog = (entry: string) => {
        setLog((prev) => [...prev, entry]);
    };

    const handleFocus = () => {
        deviceRef.current?.focus();
        appendLog("Navigator → focus()");
    };

    const handleClear = () => {
        deviceRef.current?.clear();
        appendLog("Navigator → clear()");
    };

    return (
        <div className="flex gap-6 p-6">

            {/* Navigator Console */}
            <div className="w-[320px] bg-zinc-900 text-green-400 border border-zinc-700 rounded-xl shadow-xl p-4">

                <h3 className="font-oxanium text-lg mb-3 text-emerald-400">
                    Navigator Console
                </h3>

                <div className="flex flex-col gap-2">

                    <button
                        onClick={handleFocus}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                    >
                        Activate Communicator
                    </button>

                    <button
                        onClick={handleClear}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                    >
                        Wipe Message
                    </button>

                    <button
                        onClick={() => alert(`Value: ${deviceRef.current?.getValue()}`)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-white text-sm"
                    >
                        Get Value
                    </button>
                </div>

                {/* Transmission Log */}
                <div className="mt-4 bg-black border border-zinc-700 rounded-md h-48 p-2 overflow-auto font-mono text-sm">

                    <div className="text-emerald-500 mb-1">
                        Transmission Log
                    </div>

                    {log.length === 0 && (
                        <div className="text-zinc-500">
                            awaiting commands...
                        </div>
                    )}

                    {log.map((entry, index) => (
                        <div key={index} className="text-green-400">
                            {entry}
                        </div>
                    ))}

                </div>
            </div>

            {/* Field Device */}
            <FieldDeviceInput ref={deviceRef} placeholder="Transmit a message..." />

        </div>
    );
}
