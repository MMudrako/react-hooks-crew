
//import InteractiveMap from "@/components/maps/InteractiveMap";
import Link from "next/link";
import ImaginariaIntro from "@/components/ImaginariaIntro";

export default function Home() {


  return (

    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start" >
      <section className="text-center py-16 px-4 max-w-3xl mx-auto" >
        <ImaginariaIntro />

        {/* =====================
          ACTION BUTTONS
         ===================== */}
        <section className="flex py-8 justify-center gap-4">
          <Link
            href="/crew"
            className="inline-block px-4 py-3 text-accentYellow bg-backgroundDark border border-accentYellow rounded-md font-banner text-xl tracking-wide hover:bg-accentYellow hover:text-backgroundDark transition"
          >
            Meet the Crew
          </Link>

          <button className="inline-block px-4 py-3 text-accentYellow bg-backgroundDark border border-accentYellow rounded-md font-banner text-xl tracking-wide hover:bg-accentYellow hover:text-backgroundDark transition"
          >
            Learn their powers
          </button>

          <button className="inline-block px-4 py-3 text-accentYellow bg-backgroundDark border border-accentYellow rounded-md font-banner text-xl tracking-wide hover:bg-accentYellow hover:text-backgroundDark transition"
          >
            Missions
          </button>
        </section>

      </section>





    </main>

  );
}
