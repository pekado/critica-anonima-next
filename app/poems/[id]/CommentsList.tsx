import Comment from './Comment';
import { CommentInterface } from '../../../interfaces/Comments'
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
    return fn as (arg: T) => R;
}
interface Props {
    comments: CommentInterface[]
}

const getLikes = async ({ comments }: Props) => {
    const getLiked = async (commentId: string) => {
        const res = await fetch(
            `http://127.0.0.1:8090/api/collections/liked/records/?filter=(comment_id='${commentId}')`,
            {
                next: { revalidate: 10 },
            }
        );
        const data = await res.json();
        return data.items
    }

    const commentsWithLikes = comments.map(async (comment) => {
        const liked = await getLiked(comment.id)
        if (liked) comment.userLike = liked
        return comment
    })

    return await Promise.all(commentsWithLikes).then((comments) => {
        return comments
    })

}





const CommentsList = asyncComponent(async ({ comments }: Props) => {
    const commentsWithLikes = await getLikes({ comments })
    console.log(commentsWithLikes)


    return (
        <div className='my-8'>
            {commentsWithLikes?.map((comment: any) => (
                <>
                    <Comment comment={comment} key={comment.id} />
                </>
            ))}
        </div>
    )
})

export default CommentsList