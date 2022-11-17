'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CommentInterface } from '../../../interfaces/Comments'

interface Props {
    comment: CommentInterface
}

const Comment = ({ comment }: Props) => {
    const router = useRouter()
    const [modifiedComment, setModifiedComment] = useState(comment)
    const [isEditing, setIsEditing] = useState(false)

    const handleLike = async (commentParam: CommentInterface) => {
        setIsEditing(true)
        if (commentParam.userLike.length) {
            await fetch(`http://127.0.0.1:8090/api/collections/liked/records/${commentParam.userLike[0].id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
            const patch = await fetch(`http://127.0.0.1:8090/api/collections/comments/records/${commentParam.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    likes: commentParam.likes -= 1
                })
            })
            const data = await patch.json()
            data.userLike = []
            setModifiedComment(data)

        } else {
            const res = await fetch(`http://127.0.0.1:8090/api/collections/liked/records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comment_id: commentParam.id,
                    user_id: 'n8afunk1woq8nuc'
                })
            })
            const patch = await fetch(`http://127.0.0.1:8090/api/collections/comments/records/${commentParam.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    likes: commentParam.likes += 1
                })
            })
            const data = await res.json()
            const dataPatch = await patch.json()
            dataPatch.userLike = [data]
            setModifiedComment(dataPatch)
        }
    }
    return (
        <>
            {!isEditing ? <div
                className="shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] rounded-2xl my-10 w-5/6 h-auto even:ml-auto  odd:text-left even:text-right odd:bg-gradient-to-r from-indigo-400 via-purple-500 to-rose-400 even:bg-gradient-to-l from-emerald-600 via-cyan-600 to-orange-600 p-1 "
            >
                <div key={comment.id} className="border border-gray-300 rounded-2xl p-4 mb-4 bg-white ">
                    <p>{comment.comment}</p>
                    <div className='flex justify-between even:flex-row-reverse'>

                        <p className="text-sm text-gray-500 mt-3">
                            {new Date(comment.created).toLocaleDateString()}
                        </p>
                        <button onClick={() => handleLike(modifiedComment)} className="inline-flex items-center justify-center my-2 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-500 rounded-full focus:shadow-outline hover:bg-indigo-800">
                            {comment.userLike.length ?
                                <svg className="w-4 h-4 fill-red-500" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                :
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" fillRule="evenodd"></path></svg>

                            }
                            <span className='ml-2'>{comment.likes}</span>
                        </button>
                    </div>
                </div>
            </div> :
                <div
                    className="shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] rounded-2xl my-10 w-5/6 h-auto even:ml-auto  odd:text-left even:text-right odd:bg-gradient-to-r from-indigo-400 via-purple-500 to-rose-400 even:bg-gradient-to-l from-emerald-600 via-cyan-600 to-orange-600 p-1 "
                >
                    <div key={modifiedComment.id} className="border border-gray-300 rounded-2xl p-4 mb-4 bg-white ">
                        <p>{modifiedComment.comment}</p>
                        <div className='flex justify-between even:flex-row-reverse'>
                            <p className="text-sm text-gray-500 mt-3">
                                {new Date(modifiedComment.created).toLocaleDateString()}
                            </p>
                            <button onClick={() => handleLike(modifiedComment)} className="inline-flex items-center justify-center my-2 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-500 rounded-full focus:shadow-outline hover:bg-indigo-800">
                                {modifiedComment.userLike.length ?
                                    <svg className="w-4 h-4 fill-red-500" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    :
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" fillRule="evenodd"></path></svg>

                                }
                                <span className='ml-2'>{modifiedComment.likes}</span>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Comment