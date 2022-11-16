'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation';

interface Props {
    poemId: string
}


export default function CommentsSection({ poemId }: Props) {
    const [comment, setComment] = useState('')
    const router = useRouter();


    const handleSubmit = async () => {
        await fetch('http://127.0.0.1:8090/api/collections/comments/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: comment,
                poem_id: poemId,
                'user_id': 'n8afunk1woq8nuc'
            }),

        })
        setComment('')
        router.refresh()
    }

    return (
        <>
            <div className="shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] rounded-2xl w-full h-auto  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 "
            >

                <textarea
                    className="break-all  m-0 block focus:outline-none rounded-xl w-full min-w-max bg-white p-6 sm:p-2 mx-auto max-w-3xl space-y-6 shadow-2xl"
                    placeholder="Mínimo 3 caracteres, máximo 500."
                    value={comment}
                    maxLength={500}
                    rows={5}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <button
                onClick={handleSubmit}
                className=" rounded-2xl w-56 mt-6 float-right h-12 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">

                Comentar

            </button>
        </>
    )
}




