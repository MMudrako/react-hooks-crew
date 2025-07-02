import Image from "next/image";

export default function Home() {
  return (

    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">



      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <h1>Project description, introduction to hooks crew</h1>
      </div>
      <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2 tracking-[-.01em]">
          Get started by exploring hooks from the main menu.
        </li>
        <li className="tracking-[-.01em]">
          Try out the little arcade to entertain your learning journey.
        </li>
      </ol>
    </main>

  );
}
