'use client'

import { Slate, Editable } from 'slate-react';
import { Descendant } from 'slate';
import { useMemo } from 'react'
import { withReact } from "slate-react";
import { createEditor } from "slate";


export default function PoemContainer({ content }: any) {
    const editor = useMemo(() => withReact(createEditor()), [])
    return (
        <div
            className="rounded-2xl w-full h-auto  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]"
        >
            <Slate editor={editor} value={content}>
                <Editable readOnly
                    className='editor  block rounded-xl min-h-screen bg-white p-6 sm:p-8 mx-auto max-w-3xl space-y-6 '
                    placeholder="Enter some plain text..." />
            </Slate>
        </div >
    )
}


