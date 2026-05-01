
import { Agent, Region } from '@/types';
import regionsData from '@/data/regionLanguages.json'




// --------------------
// Utility to create a set of Agents data by region
// --------------------

const regions: Region[] = regionsData;

export function generateAgentsByRegion(regionName: string, count: number): Agent[] {

    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    const region = regions.find(r => r.regionName === regionName);

    const specialties = ["Recon",
        "Surveillance",
        "Communications",
        "Infiltration",
        "Extraction",
        "Negotiation",
        "Tech Support"
    ];

    const regionalLanguages = region?.countries.map(c => c.countryLanguage) || [];

    console.log("regionallanguages extracted: ", regionalLanguages);

    function pickLanguages(pool: string[]) {
        const count = Math.floor(Math.random() * 3) + 2; // 2–4

        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    console.log("starting generation of agents from ", region?.regionName, "region")
    return Array.from({ length: count }, (_, i) => {

        if (!region) {
            throw new Error(`Region "${regionName} not found"`)
        }

        const first = pick(region.firstNames);
        const last = `${pick(region.lastStart)}${pick(region.lastEnd)}`
        const formats = [
            `${first} ${last}`,
            `${first} ${last}-${pick(region.lastEnd)}`,
            `${first} ${last}'${pick(["ar", "en", "is"])}`,]

        return {

            id: String(crypto.randomUUID()),
            name: pick(formats),
            specialty: pick(specialties),
            status: "Untrained",
            assignedBy: "The Sorter",
            mode: "training",
            icon: "🕶️",
            traits: {
                languages: pickLanguages(regionalLanguages),
                backgrounds: [],
                martialArts: [],
                fieldRoles: []
            }

        };

    })



}



export function generateAgents(count: number): Agent[] {

    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    const firstNames = [
        "Liam", "Noah", "Ethan", "Lucas", "Mason", "Logan", "Elijah", "Daniel",
        "Samuel", "Henry", "Alexander", "David", "Benjamin", "James", "Owen",
        "Jack", "Leo", "Aiden", "Julian", "Gabriel",
        "Emma", "Olivia", "Ava", "Sophia", "Mia", "Isabella", "Amelia",
        "Charlotte", "Harper", "Aria", "Ella", "Nora", "Scarlett",
        "Layla", "Zoe", "Grace", "Hannah", "Luna", "Chloe", "Victoria"
    ];

    const lastNames = [
        "Navarro", "Kovacs", "Morales", "Ibrahim", "Tanaka", "Novak", "Petrov",
        "Rahman", "Chen", "Sato", "Hernandez", "Dubois", "Khan", "Garcia", "Rossi",
        "Silva", "Park", "Keller", "Muller", "Bennett", "Fischer", "Costa", "Singh",
        "Kaur", "Berg", "Weber", "Hoffman", "Larsen", "Ivanov", "Volkov",
        "Ortega", "Delgado", "Campos", "Mendoza", "Ramos", "Santos", "Pereira",
        "Torres", "Suarez", "Alvarez", "Castro", "Nakamura", "Yamamoto",
        "Kobayashi", "Sanchez", "Lopez", "Marin", "Vega", "Cruz", "Rojas",
        "Bravo", "Salazar", "Aguilar", "Padilla", "Dominguez", "Shwarts",
        "Cervantes", "Fuentes", "Montoya", "Quintero", "Valdez", "Escobar",
        "Reyes", "Acosta", "Miranda", "Barrios", "Molina", "Rosales",
        "Pineda", "Serrano", "Vargas", "Cardenas", "Cabrera", "Espinoza",
        "Mejia", "Zamora", "Cortez", "Guerrero", "Leon", "Solano",
        "Ponce", "Velasquez", "Chavez", "Galindo", "Figueroa"
    ];

    const specialties = ["Recon",
        "Surveillance",
        "Communications",
        "Infiltration",
        "Extraction",
        "Negotiation",
        "Tech Support"
    ];


    return Array.from({ length: count }, (_, i) => {
        const first = pick(firstNames);
        const last = pick(lastNames);
        return {

            id: String(crypto.randomUUID),
            name: `${first} ${last}`,
            specialty: pick(specialties),
            status: "Untrained",
            assignedBy: "The Sorter",
            mode: "training",
            icon: "🕶️",
            traits: {
                languages: [],
                backgrounds: [],
                martialArts: [],
                fieldRoles: []
            }

        };
    });
}

// --------------------
// Utility to create a default agent
// --------------------
export function createDefaultAgent(): Agent {
    return {
        id: String(crypto.randomUUID),
        name: "Linus Blaze",
        specialty: "Recon",
        status: "Untrained",
        assignedBy: "The Sorter",
        mode: "training",
        icon: "🕵️‍♂️",
        traits: {
            languages: [],
            backgrounds: [],
            martialArts: [],
            fieldRoles: []
        }
    }
}