
import styles from '../Notes.module.css'
import PoemContainer from './PoemContainer'


async function getNote(noteId: string) {
    const res = await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
            next: { revalidate: 10 },
        }
    );
    const data = await res.json()
    console.log(JSON.parse(data.content))
    return data
}

export default async function NotePage({ params }: any) {
    const note = await getNote(params.id)

    return <div>
        
        <PoemContainer content={JSON.parse(note.content)} />
    </div>
}