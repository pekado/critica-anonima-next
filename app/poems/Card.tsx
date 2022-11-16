import Link from "next/link";

interface Poem {
    title: string,
    content: string,
    created: string,
    id: string
}


export default function Card({ poem }: { poem: Poem }) {
    return (
        <Link href={`/poems/${poem.id}`}>
            <div
                className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] w-56 h-96"
            >
                <div className="block rounded-xl bg-white p-6 sm:p-8 " >
                    <div className="mt-16 sm:pr-8">
                        <h3 className="text-xl font-bold text-gray-900">{poem.title}</h3>

                        <p className="mt-2 text-sm text-gray-500 clamp">
                            {JSON.parse(poem.content).map((e: any) => e.children[0].text).join(' ')}
                        </p>
                        {new Date(poem.created).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </Link>
    )
}