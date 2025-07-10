import agents from '../data/fieldAgents.json'

export function getFeaturedAgents() {
    return agents.filter(agent => agent.featured);
}

export function getAgentById(id) {
    return agents.find(agent => agent.id === id);
}

export function assignRandomSkillLevel() {
    const levels = ['Novice', 'Trained', 'Expert'];
    return levels[Math.floor(Math.random() * levels.length)];
}
