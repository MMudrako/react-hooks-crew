export const capitalize = (str) => {
    if (typeof str !== "string") {
        console.log("Not a string:", str);
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}