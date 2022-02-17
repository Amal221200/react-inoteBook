import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = () => {

    const context = useContext(NoteContext)
    const { notes, fetchNotes, editNote } = context;

    useEffect(() => {
        fetchNotes()
        //eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const [note, setNote] = useState({ eid: '', etitle: '', edescription: '', etag: '' })


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleOnClick = () => {
        editNote(note.eid, note.etitle, note.edescription, note.etag)
        refClose.current.click()
    }

    return (
        <div>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 && note.edescription.length < 5} type="submit" className="btn btn-primary" onClick={handleOnClick}>Update notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2>Your Notes</h2>
            <div className="row">
                {notes.map(note => (
                    <NoteItem key={note._id} updateNote={updateNote} note={note} />
                ))}
            </div>
        </div>
    )
}

export default Notes