import CaseStudyPhase1 from "@/components/CaseStudyPhase1";
import ScreenshotsGallery from "@/components/ScreenshotsGallery";



export default function AboutPage() {
    return (
        <>
            <section className="max-w-3xl mx-auto px-4 py-12 leading-relaxed text-foreground">
                <h1 className="text-3xl md:text-4xl font-banner text-brand mb-6 uppercase">
                    Behind the Scenes
                </h1>

                <p>
                    <strong>React&rsquo;s Eleven</strong> was born from a simple goal: to truly understand React by building something both technical and fun. Instead of grinding through tutorials, I flipped the formula: learn by teaching into embrace by storytelling.
                </p>

                <p className="mt-4">
                    Each React Hook is portrayed as a specialized operative in a fictional HQ. Components are field agents. Your mission? Learn how the real engine of React works, one hook at a time—through visuals, code, and interaction.
                </p>

                <p className="mt-4">
                    The project became a full-stack playground: React, Next.js, Tailwind CSS, mocked data, conditional rendering, performance tracking, and UI logic—all tied together in a gamified learning experience.
                </p>

                <p className="mt-4 italic text-accentNeonBlue">
                    It&rsquo;s part tutorial, part story, and 100% hands-on learning.
                </p>

                <p className="mt-8">
                    Built and designed by <strong>Maria Mudrakova</strong> — Software Engineer in training and storyteller at heart.
                </p>
            </section>

            <CaseStudyPhase1 />
            <ScreenshotsGallery />

        </>


    )
}


