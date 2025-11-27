export function GenerateNum() {
    let n = 0;
    const a = [];
    while (n < 10) {
        a.push(Math.floor(Math.random() * 100));
        n++;

    }
    return a;
}