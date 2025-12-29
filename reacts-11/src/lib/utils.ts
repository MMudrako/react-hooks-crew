import { Agent } from '@/types'
// --------------------
// Utility to create a fresh default agent
// --------------------
export function createDefaultAgent(): Agent {
    return {
        id: 1,
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