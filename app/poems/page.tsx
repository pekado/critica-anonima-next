import Card from "./Card";
import styles from './Poems.module.css';


async function getNotes() {
  const res = await fetch('http://127.0.0.1:8090/api/collections/poems/records?page=1&perPage=30', { cache: 'no-store' });
  const data = await res.json()
  return data?.items as any[]
}

export default async function Notes() {
  const notes = await getNotes()
  return (
    <div>
      <div className={styles.grid}>
        {notes?.map((note) => {
          return <Card key={note.id} poem={note} />
        })}
      </div>
    </div>
  )
}
