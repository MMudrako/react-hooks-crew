
export function sanitizeInput(input: string): string {
    return input
        .replace(/[^a-zA-Z .,!?'-]/g, "")
        .slice(0, 80);
}
