async function* fetchOllamaStream(prompt: string) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "llama2", prompt, stream: true }),
  });

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error("no response body got by the server")
  }
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    yield decoder.decode(value, { stream: true })
  }



}
export async function POST(request: Request) {
  const { prompt } = await request.json();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of fetchOllamaStream(prompt)) {
        controller.enqueue(new TextEncoder().encode(chunk))
      }
      controller.close()
    }
  })

  return new Response(stream, { headers: { "Context_type": "text/plain" } })
}