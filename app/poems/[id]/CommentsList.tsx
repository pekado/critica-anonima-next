
import { Comment } from '../../../interfaces/Comments'


export default function CommentsList({ comments }: any) {


    return (
        <div className='my-8'>
            {comments?.map((comment: Comment) => (
                <div

                    className="shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] rounded-2xl my-10 w-5/6 h-auto even:ml-auto  odd:text-left even:text-right odd:bg-gradient-to-r from-indigo-400 via-purple-500 to-rose-400 even:bg-gradient-to-l from-emerald-600 via-cyan-600 to-orange-600 p-1 "
                >
                    <div key={comment.id} className="border border-gray-300 rounded-2xl p-4 mb-4 bg-white ">
                        <p>{comment.comment}</p>
                        <p className="text-sm text-gray-500 mt-3">
                            {new Date(comment.created).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}