'use client'

import { Slate, Editable } from 'slate-react';
import { useMemo, useCallback } from 'react'
import { withReact } from "slate-react";
import { createEditor } from "slate";


export default function PoemContainer({ content }: any) {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const editor = useMemo(() => withReact(createEditor()), [])
    return (
        <div
            className="rounded-2xl w-full h-auto  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]"
        >
            <Slate editor={editor} value={content}>
                <Editable readOnly
                    renderElement={renderElement}

                    className='editor  block rounded-xl min-h-screen bg-white p-6 sm:p-8 mx-auto max-w-3xl space-y-6 '
                    placeholder="Enter some plain text..." />
            </Slate>
        </div >
    )
}
const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case 'title':
            return <h2 {...attributes}>{children}</h2>
        case 'paragraph':
            return <p className='max-w-fit' {...attributes}>{children}</p>
    }
}


