export default function CrewCardsPage() {

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">


            <h1>
                Renders all crew cards
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
                {cards.map(card => (
                    <h3 key={card}>hero card # {card}</h3>
                ))}
            </div>

        </main>

    );
}
