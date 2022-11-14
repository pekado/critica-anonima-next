'use client'

import React from 'react'
import Editor from './Editor'

interface EditorElement {
    type: 'string',
    children: [{ text: string }]
}
export default function CreatePoem() {
    const [poem, setPoem] = React.useState<EditorElement>()

    const handleChange = (e: [EditorElement]) => {
        setPoem(e)
    }

    const submitPoem = async () => {
        const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: poem[0].children[0].text,
                content: JSON.stringify(poem)
            }),

        })
        const data = await res.json()
    }
    return (
        <>
            <Editor onChange={handleChange} />
            <button className='rounded-2xl w-56 mt-10 float-right h-12 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-2xl' onClick={submitPoem}>Crear</button>
        </>
    )
}
