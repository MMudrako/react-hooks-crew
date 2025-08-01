import Image from "next/image";
import Link from "next/link";

export default function HookCard({ hook }) {

    return (

        <div key={hook.id} className="group relative">
            <Image
                alt={hook.name}
                src={`/hooksAvatars/${hook.id}.png`}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                width={100}
                height={200}
            />
            <div className="mt-4 flex-col justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link href={`/crew/${hook.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            <p className="mt-1 text-sm text-gray-500">{hook.icon} {hook.name}</p>
                        </Link>
                    </h3>

                </div>

                <p className="text-sm font-medium text-gray-900">{hook.role}</p>
            </div>
        </div>

    )

}