import React, { useContext, useState, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = ({ showAlert }) => {
    const context = useContext(NoteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: '', description: '', tag: '' })

    const refClick = useRef(null)
    const refClose = useRef(null)

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const addNoteClick = () => {
        refClick.current.click()
    }

    const Sub = () =>{
        refClose.current.click()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        showAlert('Added note successfully', 'success')
    }
    return (
        <>
            <div>
                <button ref={refClick} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Launch static backdrop modal
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='my-3' onSubmit={handleSubmit} >
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                                    </div>
                                    <button disabled={note.title.length < 5 && note.description.length < 5} type="submit" className="btn btn-primary" onClick={Sub}>Add Note</button>


                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                {/* <button type="button" className="btn btn-primary">Understood</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <button className="add-btn shadow-lg btn btn-primary" onClick={addNoteClick}>+</button>
            </div>
        </>
    )
}

export default AddNote