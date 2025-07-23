import Image from 'next/image';

const screenshots = [
    {
        src: '/screenshots/ph1-landing.png',
        alt: 'Landing Page',
        caption: 'Landing Page setup'
    },
    {
        src: '/screenshots/ph1-deployed.png',
        alt: 'Hooks Crew Page',
        caption: 'Phase 1 deployed'
    },
    // Add more as needed
];

export default function ScreenshotsGallery() {
    return (
        <section className="py-10 px-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">📸 Screenshots Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {screenshots.map((shot, index) => (
                    <figure key={index} className="rounded-xl overflow-hidden shadow-md bg-background p-2">
                        <Image
                            src={shot.src}
                            alt={shot.alt}
                            width={300}
                            height={200}
                            className="rounded-lg object-cover w-full h-auto"
                        />
                        <figcaption className="text-sm text-center text-foreground mt-2">{shot.caption}</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}
