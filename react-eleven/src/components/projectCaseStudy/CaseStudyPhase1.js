export default function CaseStudyPhase1() {
    return (
        <section className="px-6 py-10 max-w-4xl mx-auto text-foreground">
            <h1 className="text-4xl font-bold mb-6 text-brand">Case Study: The React Hooks Crew</h1>

            <h2 className="text-2xl font-semibold text-accentNeonBlue mb-2">Phase 1 – Foundation Setup & Planning</h2>

            <p className="mb-4">
                This project began with a strong emphasis on structure and clarity. Unlike past projects, I prioritized task
                breakdown and visual planning from the beginning. Using Notion for planning and GitHub Issues for workflow,
                I created a clear development path.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-accentNeonYellow">🔹 Project Vision</h3>
            <p className="mb-4">
                An interactive learning environment styled as a mission-based arcade, featuring {`React’s`} 11 core hooks as
                specialized HQ agents. Users can create field agents (components), assign missions, and witness how each
                hook performs under dynamic UI conditions.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-accentNeonYellow">🔹 Planning Strategy</h3>
            <p className="mb-4">
                Early milestones included designing folder structure, Tailwind config with custom fonts/colors, avatar
                sourcing, and setting up layout components. I also configured a creative license, access rules, and issue
                tracking early to ensure a secure, intentional project evolution.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-accentNeonYellow">🔹 Timeline Reflection</h3>
            <blockquote className="italic border-l-4 border-brand pl-4 mb-4">
                While I initially kept up with tasks like layout and avatar selection, a personal break slowed things down.
                However, the detailed breakdown made it easier to get back on track. One thing I would improve is logging
                small daily notes or progress entries inside tasks to visualize momentum better.
            </blockquote>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-accentNeonYellow">🔹 Tangible Outcomes</h3>
            <ul className="list-disc pl-6 mb-4">
                <li>Project folder structure scaffolded</li>
                <li>Tailwind theme with font/color variables configured</li>
                <li>Global layout + routing with `/crew` and `/arcade` established</li>
                <li>Creative avatars sourced for hook agents and field components</li>
                <li>Repo protected with contribution rules and license disclaimer</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-accentNeonYellow">📸 Visual Snapshots (Coming Soon)</h3>
            <p className="text-sm text-muted mb-6">
                Screenshots and console logs from setup, layout render, and initial UI examples will be added as interactive
                demos are implemented.
            </p>

            <p className="text-right italic text-sm">— Maria Mudrakova, July 2025</p>
        </section>
    );
}
