import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start" >
      <section className="text-center py-16 px-4 max-w-3xl mx-auto" >
        <h1 className="text-4xl md:text-5xl text-foreground mb-6 tracking-wide" >
          Welcome to {`React's`} Eleven
        </h1>
        < p className="text-lg text-foreground leading-relaxed " >
          A covert squad of React Hooks. < br /> Each with a specialty. < br /> All essential to your mission.
        </p>
        < p className="mt-4 text-md text-accentNeonBlue" >
          Learn their powers.Step into HQ.Enter the arcade.
        </p>

        < div className="mt-8" >
          <Link
            href="/crew"
            className="inline-block px-4 py-3 text-accentYellow bg-backgroundDark border border-accentYellow rounded-md font-banner text-xl tracking-wide hover:bg-accentYellow hover:text-backgroundDark transition"
          >
            Meet the Crew
          </Link>
        </div>
      </section>

    </main>

  );
}
