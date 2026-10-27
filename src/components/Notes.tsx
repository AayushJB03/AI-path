import { useState } from 'react'
import { setNote, useNotes } from '../progress'

/** Per-lesson note that autosaves. `children` renders beside the toggle (e.g. the complete button). */
export default function Notes({ lessonId, children }: { lessonId: string; children?: React.ReactNode }) {
  const note = useNotes()[lessonId] ?? ''
  const [open, setOpen] = useState(note !== '')
  return (
    <>
      <div className="actions">
        {children}
        <button className="btn ghost" onClick={() => setOpen(!open)}>{open ? 'Hide note' : 'Add a note'}</button>
      </div>
      {open && (
        <textarea className="note" value={note} rows={5} placeholder="Your notes for this lesson…"
          aria-label="Lesson notes" onChange={(e) => setNote(lessonId, e.target.value)} />
      )}
    </>
  )
}
