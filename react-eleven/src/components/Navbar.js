import Link from "next/link";

const navigation = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Crew', url: '/crew' },
    { name: 'Arcade', url: '/arcade' }
]

export default function Navbar() {


    return (
        <>
            <div className="bg-backgroundDark">
                <div className="flex justify-evenly space-x-4 ">
                    {navigation.map((item) => {
                        return (
                            <Link
                                key={item.name}
                                href={item.url}

                            >
                                <h1 className='font-banner rounded-md px-3 py-2 text-brand text-left text-4xl'>

                                    {item.name}
                                </h1>
                            </Link>
                        )
                    })}
                </div>
            </div>


        </>
    )
}