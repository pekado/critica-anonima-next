'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import {
    Transforms,
    createEditor,
    Node,
    Element as SlateElement,
    Descendant,
} from 'slate'
import { withHistory } from 'slate-history'

type ParagraphElement = {
    type: 'paragraph'
    align?: string
    children: Descendant[]
}

type TitleElement = { type: 'title'; children: Descendant[] }

const withLayout = editor => {
    const { normalizeNode } = editor

    editor.normalizeNode = ([node, path]) => {
        if (path.length === 0) {
            if (editor.children.length < 1) {
                const title: TitleElement = {
                    type: 'title',
                    children: [{ text: 'Untitled' }],
                }
                Transforms.insertNodes(editor, title, { at: path.concat(0) })
            }

            if (editor.children.length < 2) {
                const paragraph: ParagraphElement = {
                    type: 'paragraph',
                    children: [{ text: '' }],
                }
                Transforms.insertNodes(editor, paragraph, { at: path.concat(1) })
            }

            for (const [child, childPath] of Node.children(editor, path)) {
                let type: string
                const slateIndex = childPath[0]
                const enforceType = type => {
                    if (SlateElement.isElement(child) && child.type !== type) {
                        const newProperties: Partial<SlateElement> = { type }
                        Transforms.setNodes<SlateElement>(editor, newProperties, {
                            at: childPath,
                        })
                    }
                }

                switch (slateIndex) {
                    case 0:
                        type = 'title'
                        enforceType(type)
                        break
                    case 1:
                        type = 'paragraph'
                        enforceType(type)
                    default:
                        break
                }
            }
        }

        return normalizeNode([node, path])
    }

    return editor
}

const HoveringMenuExample = ({ onChange }: any) => {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const editor = useMemo(
        () => withLayout(withHistory(withReact(createEditor()))),
        []
    )
    const [value, setValue] = useState(initialValue);

    return (
        <div
            className="shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] rounded-2xl w-full h-auto  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 "
        >
            <Slate editor={editor} value={initialValue} onChange={value => onChange(value)}>
                <Editable
                    renderElement={renderElement}
                    className='editor break-all block rounded-xl min-h-screen min-w-max bg-white p-6 sm:p-8 mx-auto max-w-3xl space-y-6 shadow-2xl'
                    placeholder="Enter a title…"
                    spellCheck
                    autoFocus
                    onChange={value => onChange(value)}
                />
            </Slate>
        </div>
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


const initialValue: Descendant[] = [
    {
        type: 'title',
        children: [{ text: 'Este es el título' }],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    '',
            },
        ],
    },
]

export default HoveringMenuExample