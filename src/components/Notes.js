import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'

const Notes = () => {

    const context = useContext(NoteContext)
    const { notes, fetchNotes } = context;

    useEffect(()=>{
        fetchNotes()
        //eslint-disable-next-line
    }, [])

    return (
        <div>
            <h2>Your Notes</h2>
            <div className="row">
                {notes.map(note => (
                    <NoteItem key={note._id} title={note.title} description={note.description} tag={note.tag} id={note._id} />
                ))}
            </div>
        </div>
    )
}

export default Notes