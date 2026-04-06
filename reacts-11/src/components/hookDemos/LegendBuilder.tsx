"use client";

import { useState, useTransition } from "react";

async function consumeStream(prompt: string, onChunk: (chunk: string) => void) {
    const res = await fetch("/api/ollama", {
        method: "POST",
        body: JSON.stringify({ prompt, stream: true })
    });
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
        throw new Error("no response body available for client")
    }

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        onChunk(decoder.decode(value, { stream: true }))
    }
}

export default function LegendBuilderMemo({ prompt }: { prompt: string }) {
    const [response, setResponse] = useState("");



    const handleSubmit = async () => {

        consumeStream(prompt, (chunk) => {


            setResponse(prev => prev + JSON.parse(chunk).response)
        });
    };



    return (
        <>
            <div>

                <button type="submit"
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={handleSubmit}>Send Prompt</button>

            </div>

            <p>{response}</p>
        </>


    );
}


export function LegendBuilderTransition({ prompt }: { prompt: string }) {
    const [response, setResponse] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = () => {
        // Reset before starting
        setResponse("");

        startTransition(async () => {
            await consumeStream(prompt, (chunk) => {

                setResponse((prev) => prev + JSON.parse(chunk).response);
            });
        });
    };

    return (
        <div>
            <button
                type="submit"
                className={`mt-2 px-3 py-1 rounded ${isPending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
                    }`}
                onClick={handleSubmit}
                disabled={isPending}
            >
                {isPending ? "Thinking..." : "Send Prompt"}
            </button>

            <div className="mt-2 p-2 border rounded bg-gray-50 whitespace-pre-wrap">
                {response || (isPending && "Waiting for response...")}
            </div>
        </div>
    );
}