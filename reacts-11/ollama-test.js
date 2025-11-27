// ollama-test.js
import fetch from "node-fetch";

async function run() {

    /* //GPT
    //  const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "llama2",
            prompt: "Write a spy legend about Agent Phantom in 2 sentences.",
        }),
    });

    // Ollama streams line by line; collect them
    const reader = response.body.getReader();
    let result = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        // each chunk is a JSON line
        chunk.trim().split("\n").forEach(line => {
            if (line) {
                const parsed = JSON.parse(line);
                if (parsed.response) result += parsed.response;
            }
        });
    }

    console.log("\nFinal Legend:\n", result); */
    /* //combined with StackOverflow
    let result = "";
    fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "llama2",
            prompt: "Write a bedtime story for 3 year old boy in 2 sentences.",
        }),
    })
        .then(response => response.body.on('readable', async () => {
            // Ollama streams line by line; collect them
            const reader = response.getReader();


            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = new TextDecoder().decode(value);
                // each chunk is a JSON line
                chunk.trim().split("\n").forEach(line => {
                    if (line) {
                        const parsed = JSON.parse(line);
                        if (parsed.response) result += parsed.response;
                    }
                })
            }
        }))
        .catch(err => console.log(err));
    console.log("\nFinal Legend:\n", result); */

    //gemeni


}





run();
