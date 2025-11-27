"use server";

async function* fetch(prompt: string) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "llama2", prompt, stream: true }),
  }).then((res) => res.body)


  /*
    
    const decoder = new TextDecoder();
    let buffer = "";
    let lastChunk = "";
  
    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
  
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Save incomplete line
  
      for (const line of lines) {
        if (!line.trim()) continue;
  
        try {
          const { response } = JSON.parse(line);
          if (!response) continue;
  
          // 🧠 Smart spacing logic
          const needsSpace =
            lastChunk &&
            !/\s$/.test(lastChunk) &&
            !/^\s/.test(response) &&
            !/^[.,!?;:]/.test(response); // Don't add space before punctuation
  
          const chunkToYield = needsSpace ? " " + response : response;
          yield chunkToYield;
          lastChunk = response;
        } catch {
          // Ignore malformed lines
        }
      }
    } */

  yield res;
}