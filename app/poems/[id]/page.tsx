import CommentsList from './CommentsList';
import CommentsSection from './CommentsSection';
import PoemContainer from './PoemContainer';

async function getPoem(poemId: string) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/poems/records/${poemId}`,
        {
            next: { revalidate: 10 },
        }
    );
    const data = await res.json();
    return data;
}

const fetchComments = async (poemId: string) => {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/comments/records?page=1&perPage=10&filter=(poem_id='${poemId}')`, { cache: 'no-store' }
    );
    const data = await res.json();
    return data?.items as any[];
};

export default async function NotePage({ params }: any) {
    const note = await getPoem(params.id);
    const comments = await fetchComments(params.id);

    return (
        <>
            <PoemContainer content={JSON.parse(note.content)} />
            <CommentsList comments={comments} />
            <CommentsSection poemId={note.id} />
        </>
    );
}
